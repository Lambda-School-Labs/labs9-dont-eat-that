import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from './firebase';
import { addAllergy } from '../actions';

class Settings extends React.Component {
  state = {
    email: '',
    password: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <div>
          <h2>User Account</h2>
          <form
            onSubmit={() =>
              this.props.firebase.doPasswordReset(this.state.email)
            }
          >
            <label htmlFor="email">Password Reset</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <br />
          <form
            onSubmit={() =>
              this.props.firebase.doPasswordUpdate(this.state.password)
            }
          >
            <label htmlFor="password">Password Change</label>
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <h2>Allergies</h2>
          <ul>
            {this.props.allergies.map(allergy => {
              return <li key={allergy.name}>{allergy.name}</li>;
            })}
          </ul>
          <button onClick={this.props.addAllergy}>Add Allergy</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { addAllergy }
)(compose(withFirebase)(Settings));
