import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { chargeUser, cancelSubscription } from '../actions';

class CheckoutForm extends React.Component {
  state = {
    plan: 'silver'
  };

  onRadioButton = value => {
    this.setState({ plan: value });
  };

  submit = async ev => {
    let { token } = await this.props.stripe.createToken({ name: 'name' });
    console.log(token);
    await this.props.chargeUser(token, this.state.plan);
  };

  render() {
    if (this.props.complete)
      return (
        <div>
          <h1>Purchase Complete</h1>
          <button onClick={this.props.cancelSubscription}>
            Cancel Subscription
          </button>
        </div>
      );
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <label htmlFor="silver">Silver Plan: $2.00 per month</label>
        <br />
        <input
          type="radio"
          id="silver"
          checked={this.state.plan === 'silver'}
          onChange={() => this.onRadioButton('silver')}
        />
        <br />
        <label htmlFor="gold">Gold Plan: $10.00 per year</label>
        <br />
        <input
          type="radio"
          id="gold"
          checked={this.state.plan === 'gold'}
          onChange={() => this.onRadioButton('gold')}
        />

        <CardElement />
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    complete: state.paymentReducer.paymentComplete
  };
};

export default connect(
  mapStateToProps,
  { chargeUser, cancelSubscription }
)(injectStripe(CheckoutForm));
