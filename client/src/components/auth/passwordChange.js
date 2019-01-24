import React, { Component } from 'react';
import { Form, Button, Header, Segment, Input } from 'semantic-ui-react';

import { withFirebase } from '../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  successMessage: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({
          ...INITIAL_STATE,
          successMessage: 'Password reset success! '
        });
      })
      .catch(error => {
        this.setState({ ...INITIAL_STATE, error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    // disabled for inactive
    return (
      <Segment
        basic
        color="black"
        // inverted
        style={{ width: '95%', marginLeft: '2.5%' }}
      >
        <Form onSubmit={this.onSubmit}>
          <Header as="h3">Password Reset</Header>
          <Form.Field>
            <Input
              focus
              color="black"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="New Password"
            />
          </Form.Field>
          <Form.Field>
            <Input
              focus
              color="black"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm New Password"
            />
          </Form.Field>
          <Button disabled={isInvalid} type="submit">
            Reset My Password
          </Button>

          {this.state.successMessage}
          {error && <p>{error.message}</p>}
        </Form>
      </Segment>
    );
  }
}

export default withFirebase(PasswordChangeForm);
