import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class SideMenu extends React.Component {
  // side menu should be hidden when landing page is shown
  // Landing page is displayed when user is not loggedin and path is '/'

  state = { activeItem: window.location.pathname };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  renderSideMenu = item => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/signin' ||
      window.location.pathname === '/signup'
    ) {
      return null;
    } else {
      return (
        <Menu pointing vertical inverted className="sideMenu">
          <NavLink to="/recipes">
            <Menu.Item
              name="/recipes"
              active={item === '/recipes'}
              onClick={this.handleItemClick}
            >
              Recipes List
            </Menu.Item>
          </NavLink>
          <NavLink to="/recipes/new">
            <Menu.Item
              name="/recipes/new"
              active={item === '/recipes/new'}
              onClick={this.handleItemClick}
            >
              New Recipe
            </Menu.Item>
          </NavLink>
          <NavLink to="/recipes/import">
            <Menu.Item
              name="/recipes/import"
              active={item === '/recipes/import'}
              onClick={this.handleItemClick}
            >
              Import Recipe
            </Menu.Item>
          </NavLink>
          <NavLink to="/billing">
            <Menu.Item
              name="/billing"
              active={item === '/billing'}
              onClick={this.handleItemClick}
            >
              Billing
            </Menu.Item>
          </NavLink>
          <NavLink to="/settings">
            <Menu.Item
              name="/settings"
              active={item === '/settings'}
              onClick={this.handleItemClick}
            >
              Settings
            </Menu.Item>
          </NavLink>
        </Menu>
      );
    }
  };

  render() {
    const { activeItem } = this.state;
    return this.renderSideMenu(activeItem);
  }
}
export default SideMenu;
