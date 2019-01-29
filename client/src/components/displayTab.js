import React from 'react';
import { Menu } from 'semantic-ui-react';

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
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Other People'
          active={activeItem === 'Other People'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default DisplayTab;
