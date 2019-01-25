import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Header, Form, Segment, Icon, Input } from 'semantic-ui-react';

import { withFirebase } from './firebase';
import { addAllergy, getAllergies, deleteAllergy } from '../actions/index';
import PasswordChangeForm from './auth/passwordChange';
import ourColors from '../ColorScheme.js';

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
          <Header as='h1'>Settings</Header>
          {localStorage.getItem('uid') && <PasswordChangeForm />}
          <Header
            as='h3'
            color='black'
            // inverted
            attached='top'
            style={{ width: '70%', marginLeft: '15%' }}
          >
            Allergies
          </Header>
          <Segment attached style={{ width: '70%', marginLeft: '15%' }}>
            <ul>
              {this.props.allergies.map((allergy, i) => {
                if (typeof allergy === 'object') {
                  return (
                    <li key={i}>
                      {allergy.name}{' '}
                      <Icon
                        onClick={() => this.props.deleteAllergy(allergy.name)}
                        name="delete"
                        style={{ color: ourColors.warningColor }}
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
                        style={{ color: ourColors.warningColor, cursor: 'pointer' }}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Segment>
          <Segment
            style={{ width: '70%', marginLeft: '15%', background: ourColors.formColor }}
          >
            <Form>
              <Form.Field>
                {/* changed button into Icon
          also put Icon inside of Input as action */}

                <Input
                  size='mini'
                  type='text'
                  name='allergy'
                  id='allergy'
                  placeholder='Please enter an allergy...'
                  value={this.state.allergy}
                  onChange={this.onChange}
                  action={
                    <Icon
                      name='add circle'
                      onClick={this.onAddAllergy}
                      style={
                        !localStorage.getItem('uid')
                          ? {
                              color: ourColors.inactiveButtonColor,
                              cursor: 'pointer'
                            }
                          : { color: ourColors.buttonColor, cursor: 'pointer' }
                      }
                      disabled={!localStorage.getItem('uid')}
                      size='big'
                      // style={{ cursor: 'pointer' }}
                    />
                  }
                  actionPosition='right'
                />
              </Form.Field>
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
