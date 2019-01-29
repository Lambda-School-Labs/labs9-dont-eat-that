import React from 'react';
import { Menu } from 'semantic-ui-react';
import ourColors from '../ColorScheme';

// This class display Tab to toggle between
// My own recipes and other people's recipes

class DisplayTab extends React.Component {
  state = { activeItem: 'Your Own' };

  handleItemClick = (e, { name, personal }) => {
    this.setState({ activeItem: name });
    this.props.personalCheck(personal);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular>
        <Menu.Item
          name='Your Own'
          personal
          active={activeItem === 'Your Own'}
          style={
            activeItem === 'Your Own'
              ? {
                  background: ourColors.formColor,
                  color: 'black'
                }
              : null
          }
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Other People'
          active={activeItem === 'Other People'}
          style={
            activeItem === 'Other People'
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
