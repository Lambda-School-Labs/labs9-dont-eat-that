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

import { chargeUser, cancelSubscription, getUser } from '../actions';

class CheckoutForm extends React.Component {
  state = {
    plan: 'silver'
  };

  onRadioButton = value => {
    this.setState({ plan: value });
  };

  desktopTable = () => {
    return (
      <Table
        definition
        striped
        size="small"
        color="violet"
        inverted
        style={{
          width: '95%',
          marginLeft: '2.5%',
          marginBottom: '15px',
          fontFamily: 'Roboto'
        }}
      >
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell />
            <Table.HeaderCell>Dishwasher</Table.HeaderCell>
            <Table.HeaderCell>Line Cook</Table.HeaderCell>
            <Table.HeaderCell>Executive Chef</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cost</Table.Cell>
            <Table.Cell textAlign="center">Free</Table.Cell>
            <Table.Cell textAlign="center">$2/month</Table.Cell>
            <Table.Cell textAlign="center">$10/year</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Display Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Create/Edit Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Copy Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Import Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Recipe Reviews</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Allergy Notifications</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nutritional Analysis</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Export Recipes to Excel</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Select Plan</Table.Cell>
            <Table.Cell textAlign="center">
              <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <input
                type="radio"
                id="silver"
                checked={this.state.plan === 'silver'}
                onChange={() => this.onRadioButton('silver')}
              />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <input
                type="radio"
                id="gold"
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
        size="small"
        color="violet"
        inverted
        style={{
          width: '95%',
          marginLeft: '2.5%',
          marginBottom: '15px',
          fontFamily: 'Roboto'
        }}
      >
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell style={{ background: '#6435C9'}} />
            <Table.HeaderCell>Dishwasher</Table.HeaderCell>
            <Table.HeaderCell>Line Cook</Table.HeaderCell>
            <Table.HeaderCell>Executive Chef</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cost</Table.Cell>
            <Table.Cell textAlign="center">Dishwasher: Free</Table.Cell>
            <Table.Cell textAlign="center">Line Cook: $2/month</Table.Cell>
            <Table.Cell textAlign="center">Executive Chef: $10/year</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Display Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Create/Edit Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Copy Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Import Recipes</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Recipe Reviews</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Allergy Notifications</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Nutritional Analysis</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Export Recipes to Excel</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line Cook: <Icon name="checkmark" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef: <Icon name="checkmark" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Select Plan</Table.Cell>
            <Table.Cell textAlign="center">
              Dishwasher: <Icon name="close" />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Line cook:{' '}
              <input
                type="radio"
                id="silver"
                checked={this.state.plan === 'silver'}
                onChange={() => this.onRadioButton('silver')}
              />
            </Table.Cell>
            <Table.Cell textAlign="center">
              Executive Chef:{' '}
              <input
                type="radio"
                id="gold"
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
    if (this.props.complete)
      return (
        <div>
          <Header as="h1">Purchase Complete</Header>
          <Button onClick={this.props.cancelSubscription}>
            Cancel Subscription
          </Button>
        </div>
      );
    return (
      <div>
        <Header>Don't Eat That Subscription Plans</Header>
        <Responsive minWidth={768}>{this.desktopTable()}</Responsive>
        <Responsive maxWidth={767}>{this.mobileTable()}</Responsive>
        <div style={{ width: '95%', marginLeft: '2.5%' }}>
          <Header as="h3" attached="top" color="violet" inverted>
            Pay with Card
          </Header>
          <Segment attached>
            <CardElement />
          </Segment>
        </div>
        <br />
        <Button onClick={this.submit}>Subscribe</Button>
        <Button color="red" onClick={this.props.cancelSubscription}>
          Cancel Subscription
        </Button>
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
  { chargeUser, cancelSubscription, getUser }
)(injectStripe(CheckoutForm));
