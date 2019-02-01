import React from 'react';
import { Menu } from 'semantic-ui-react';
import ourColors from '../ColorScheme';

// This class display Tab to toggle between
// My own recipes and other people's recipes

class DisplayTab extends React.Component {
  state = { activeItem: this.props.isLogged ? 'Your Own' : 'Other' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.personalCheck(name === 'Your Own');
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular className='tab2'>
        <Menu.Item
          name='Your Own'
          active={activeItem === 'Your Own' && this.props.isLogged}
          style={
            activeItem === 'Your Own' && this.props.isLogged
              ? {
                  background: ourColors.formColor,
                  color: 'black'
                }
              : this.props.isLogged
              ? null
              : { cursor: 'not-allowed' }
          }
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Other'
          active={activeItem === 'Other' || !this.props.isLogged}
          style={
            activeItem === 'Other' || !this.props.isLogged
              ? {
                  background: ourColors.formColor,
                  color: 'black'
                }
              : null
          }
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default DisplayTab;
