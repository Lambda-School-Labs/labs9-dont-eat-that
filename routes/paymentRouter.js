const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const db = require('../data/dbConfig');

const router = express.Router();

router.post('/charge', async (req, res) => {
  const { token, customerPlan, firebaseid } = req.body;
  const plan = // getting actually stripe plan id for silver or gold plan
    customerPlan === 'silver' ? 'plan_EKIEXJhyKqBTFd' : 'plan_EKIFbngvwjejux';
  try {
    const user = db('users')
      .where({ firebaseid })
      .first();
    if (!user.subscriptionid) {
      const customer = await stripe.customers.create({
        // creating customer
        source: token
      });
      const subscription = await stripe.subscriptions.create({
        // subscription customer to plan
        customer: customer.id,
        items: [{ plan }]
      });
      await db('users') // saving customer and subscription id to user db
        .where({ firebaseid })
        .update({
          customerid: customer.id,
          subscriptionid: subscription.id
        });
      res.status(201).json({ subscription });
    } else {
      res.status(400).json({ message: 'User already has a subscription.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'There was an error processing your subscription.' });
  }
});

router.post('/cancel', async (req, res) => {
  const { firebaseid } = req.body;
  try {
    const user = await db('users') // getting user in db
      .where({ firebaseid })
      .first();
    const subscription = await stripe.subscriptions.del(user.subscriptionid); // cancelling subscription with user subscriptionid
    await db('users') // removing subscriptionid from user in db
      .where({ firebaseid })
      .update({ subscriptionid: null });
    res.status(200).json({ subscription });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'There was an error canceling your subscription.' });
  }
});

module.exports = router;
