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
              : null
          }
          onClick={this.handleItemClick}
        />
        <Menu.Item
<<<<<<< HEAD
          name='Other Recipes'
          active={activeItem === 'Other Recipes'}
          style={
            activeItem === 'Other Recipes'
=======
          name='Other'
          active={activeItem === 'Other' || !this.props.isLogged}
          style={
            activeItem === 'Other' || !this.props.isLogged
>>>>>>> 9af30ed7a49a0af1c9e6660bbd09d398a19b40c1
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
