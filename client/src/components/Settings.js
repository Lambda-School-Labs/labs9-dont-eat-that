import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Button, Header, Form, Segment, Icon } from 'semantic-ui-react';

import { withFirebase } from './firebase';
import { addAllergy, getAllergies, deleteAllergy } from '../actions/index';
import PasswordChangeForm from './auth/passwordChange';

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
    this.props.addAllergy(this.state.allergy.toLowerCase());
    this.setState({ allergy: '' });
  };

  render() {
    if (this.props.allergies) {
      return (
        <div>
          <Header as="h1">Settings</Header>
          <PasswordChangeForm />
          <Header
            as="h3"
            color="red"
            inverted
            attached="top"
            style={{ width: '95%', marginLeft: '2.5%' }}
          >
            Allergies
          </Header>
          <Segment attached style={{ width: '95%', marginLeft: '2.5%' }}>
            <ul>
              {this.props.allergies.map((allergy, i) => {
                if (typeof allergy === 'object') {
                  return (
                    <li key={i}>
                      {allergy.name}{' '}
                      <Icon
                        onClick={() => this.props.deleteAllergy(allergy.name)}
                        name="delete"
                        style={{ color: 'red' }}
                      />
                    </li>
                  );
                } else {
                  return (
                    <li key={i}>
                      {allergy}{' '}
                      <Icon
                        onClick={() => this.props.deleteAllergy(allergy)}
                        name="delete"
                        style={{ color: 'red' }}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Segment>
          <Segment
            color="red"
            inverted
            style={{ width: '95%', marginLeft: '2.5%' }}
          >
            <Form inverted>
              <Form.Field>
                <input
                  type="text"
                  name="allergy"
                  id="allergy"
                  placeholder="Please enter an allergy..."
                  value={this.state.allergy}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Button onClick={this.onAddAllergy}>Add Allergy</Button>
            </Form>
          </Segment>
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
  { addAllergy, getAllergies, deleteAllergy }
)(compose(withFirebase)(Settings));
