import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withFirebase } from './firebase';
import { addAllergy, getAllergies } from '../actions/index';

class Settings extends React.Component {
  state = {
    email: '',
    password: '',
    allergy: ''
  };
  componentDidMount() {
    this.props.getAllergies();
  }
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onAddAllergy = e => {
    this.props.addAllergy(this.state.allergy);
    this.setState({ allergy: '' });
  };
  render() {
    if (this.props.allergies) {
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
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {this.props.allergies.map((allergy, i) => {
                return <li key={i}>{allergy}</li>;
              })}
            </ul>
            <label htmlFor="allergy" />
            <input
              type="text"
              name="allergy"
              id="allergy"
              placeholder="Please enter an allergy..."
              value={this.state.allergy}
              onChange={this.onChange}
            />
            <button onClick={this.onAddAllergy}>Add Allergy</button>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    allergies: state.usersReducer.user.allergies
  };
};

export default connect(
  mapStateToProps,
  { addAllergy, getAllergies }
)(compose(withFirebase)(Settings));
