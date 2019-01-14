import axios from 'axios';

export const CANCEL_SUB = 'CANCEL_SUB';
export const CHARGE_USER = 'CHARGE_USER';
export const ERROR = "ERROR";

const URL = 'https://donteatthat.herokuapp.com';

export const chargeUser = (token, plan) => dispatch => {
    const firebaseid = localStorage.getItem('uid');
    axios
      .post(`${URL}/api/payments/charge`, {
        token: token.id,
        customerPlan: plan,
        firebaseid
      })
      .then(res => dispatch({ type: CHARGE_USER, payload: true }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
  
  export const cancelSubscription = () => dispatch => {
    const firebaseid = localStorage.getItem('uid');
    axios
      .post(`${URL}/api/payments/cancel`, { firebaseid })
      .then(res => dispatch({ type: CANCEL_SUB, payload: true }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
  
  