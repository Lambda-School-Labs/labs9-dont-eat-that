import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Table,
  Icon,
  Segment,
  Responsive
} from 'semantic-ui-react';

import { chargeUser, cancelSubscription, getUser, getPlan } from '../actions';
import ourColors from '../ColorScheme';

class CheckoutForm extends React.Component {
  state = {
    plan: 'silver'
  };

  componentDidMount() {
    this.props.getPlan();
  }

  onRadioButton = value => {
    this.setState({ plan: value });
  };

  desktopTable = () => {
    return (
      <Table
        definition
        striped
        size='small'
        style={{
          width: '95%',
          maxWidth: '600px',
          margin: '0 auto 15px',
          // marginLeft: '2.5%',
          // marginBottom: '15px',
          fontFamily: 'Roboto',
          background: ourColors.billingColor
        }}
      >
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell style={{ background: 'white' }} />
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Dishwasher
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Line Cook
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Executive Chef
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>Cost</Table.Cell>
            <Table.Cell textAlign='center'>Free</Table.Cell>
            <Table.Cell textAlign='center'>$2/month</Table.Cell>
            <Table.Cell textAlign='center'>$10/year</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Display Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Create/Edit Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Copy Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Import Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Recipe Reviews
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Allergy Notifications
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Nutritional Analysis
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Download Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'bold' }}>Select Plan:</Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <input
                type='radio'
                id='silver'
                checked={this.state.plan === 'silver'}
                onChange={() => this.onRadioButton('silver')}
              />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <input
                type='radio'
                id='gold'
                checked={this.state.plan === 'gold'}
                onChange={() => this.onRadioButton('gold')}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  mobileTable = () => {
    return (
      <Table
        definition
        striped
        size='small'
        style={{
          maxWidth: '500px',
          width: '95%',
          margin: '0 auto 15px',
          // marginLeft: '2.5%',
          // marginBottom: '15px',
          fontFamily: 'Roboto',
          background: ourColors.billingColor
        }}
      >
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell style={{ background: ourColors.billingColor }} />
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Dishwasher
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Line Cook
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{
                background: ourColors.billingColor,
                fontWeight: 'normal'
              }}
            >
              Executive Chef
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>Cost</Table.Cell>
            <Table.Cell textAlign='center'>Dishwasher: Free</Table.Cell>
            <Table.Cell textAlign='center'>Line Cook: $2/month</Table.Cell>
            <Table.Cell textAlign='center'>Executive Chef: $10/year</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Display Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Create/Edit Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Copy Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Import Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Recipe Reviews
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Allergy Notifications
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Nutritional Analysis
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'normal' }}>
              Download Recipes
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line Cook: <Icon name='checkmark' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef: <Icon name='checkmark' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell style={{ fontWeight: 'bold' }}>Select Plan:</Table.Cell>
            <Table.Cell textAlign='center'>
              Dishwasher: <Icon name='close' />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Line cook:{' '}
              <input
                type='radio'
                id='silver'
                checked={this.state.plan === 'silver'}
                onChange={() => this.onRadioButton('silver')}
              />
            </Table.Cell>
            <Table.Cell textAlign='center'>
              Executive Chef:{' '}
              <input
                type='radio'
                id='gold'
                checked={this.state.plan === 'gold'}
                onChange={() => this.onRadioButton('gold')}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  submit = async ev => {
    let { token } = await this.props.stripe.createToken({ name: 'name' });
    console.log(token);
    await this.props.chargeUser(token, this.state.plan);
    await this.props.getUser();
  };

  render() {
    let planName = 'Dishwasher';
    if (this.props.userPlan) {
      switch (this.props.userPlan) {
        case 'silver':
          planName = 'Line Cook';
          break;
        case 'gold':
          planName = 'Executive Chef';
          break;
        default:
          planName = 'Dishwasher';
      }
    }

    if (this.props.complete)
      return (
        <div>
          <Header as='h1'>Purchase Complete</Header>
          <Header as='h2'>Currently Selected Plan: {planName}</Header>
          <Button
            onClick={this.props.cancelSubscription}
            style={{ background: ourColors.buttonColor, color: 'white' }}
          >
            Cancel Subscription
          </Button>
        </div>
      );
    return (
      <div>
        <Header as='h1' style={{ marginBottom: 0 }}>
          Don't Eat That Subscription Plans
        </Header>
        <Header as='h5' style={{ marginTop: 0, marginBottom: '15px' }}>
          Currently Selected Plan: {planName}
        </Header>
        <Responsive minWidth={768}>{this.desktopTable()}</Responsive>
        <Responsive maxWidth={767}>{this.mobileTable()}</Responsive>
        <div
          style={{
            width: '80%',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <Responsive
            minWidth={940}
            style={{ width: '50%', minWidth: '350px', marginRight: '10px' }}
          >
            <Header
              as='h3'
              attached='top'
              style={{ background: ourColors.menuColor }}
            >
              Pay with Card
            </Header>
            <Segment attached>
              <CardElement />
            </Segment>
          </Responsive>
          <Responsive
            maxWidth={939}
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Header
              as='h3'
              attached='top'
              style={{ background: ourColors.menuColor }}
            >
              Pay with Card
            </Header>
            <Segment attached>
              <CardElement />
            </Segment>
          </Responsive>
          {this.props.user.subscriptionid ? (
            <React.Fragment>
              <Responsive
                minWidth={940}
                style={{
                  width: '25%',
                  minWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Button
                  onClick={this.submit}
                  style={{
                    background: ourColors.inactiveButtonColor,
                    color: 'white',
                    marginBottom: '10px'
                  }}
                  disabled
                >
                  Subscribe
                </Button>
                <Button
                  onClick={this.props.cancelSubscription}
                  style={{ background: ourColors.buttonColor, color: 'white' }}
                >
                  Cancel Subscription
                </Button>
              </Responsive>
              <Responsive
                maxWidth={939}
                style={{
                  minWidth: '200px',
                  display: 'flex'
                }}
              >
                <Button
                  onClick={this.submit}
                  style={{
                    background: ourColors.inactiveButtonColor,
                    color: 'white',
                    marginTop: '10px'
                  }}
                  disabled
                >
                  Subscribe
                </Button>
                <Button
                  onClick={this.props.cancelSubscription}
                  style={{
                    background: ourColors.buttonColor,
                    color: 'white',
                    marginTop: '10px'
                  }}
                >
                  Cancel Subscription
                </Button>
              </Responsive>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Responsive
                minWidth={940}
                style={{
                  width: '25%',
                  minWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Button
                  onClick={this.submit}
                  style={{
                    background: ourColors.buttonColor,
                    color: 'white',
                    marginBottom: '10px'
                  }}
                  disabled={!localStorage.getItem('uid')}
                >
                  Subscribe
                </Button>
                <Button
                  onClick={this.props.cancelSubscription}
                  style={{ background: ourColors.buttonColor, color: 'white' }}
                  disabled
                >
                  Cancel Subscription
                </Button>
              </Responsive>
              <Responsive
                maxWidth={939}
                style={{
                  minWidth: '200px',
                  display: 'flex'
                }}
              >
                <Button
                  onClick={this.submit}
                  style={{
                    background: ourColors.buttonColor,
                    color: 'white',
                    marginTop: '10px'
                  }}
                  disabled={!localStorage.getItem('uid')}
                >
                  Subscribe
                </Button>
                <Button
                  onClick={this.props.cancelSubscription}
                  style={{
                    background: ourColors.buttonColor,
                    color: 'white',
                    marginTop: '10px'
                  }}
                  disabled
                >
                  Cancel Subscription
                </Button>
              </Responsive>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    complete: state.paymentReducer.paymentComplete,
    user: state.usersReducer.user,
    userPlan: state.paymentReducer.plan
  };
};

export default connect(
  mapStateToProps,
  { chargeUser, cancelSubscription, getUser, getPlan }
)(injectStripe(CheckoutForm));
