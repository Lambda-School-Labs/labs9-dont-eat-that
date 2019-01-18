import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class SideMenu extends React.Component {
  // side menu should be hidden when landing page is shown
  // Landing page is displayed when user is not loggedin and path is '/'

  state = { activeItem: 'recipeList' };

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
          <Menu.Item
            name="recipeList"
            active={item === 'recipeList'}
            onClick={this.handleItemClick}
          >
            <NavLink to="/recipes">Recipes List</NavLink>
          </Menu.Item>
          <Menu.Item
            name="newRecipe"
            active={item === 'newRecipe'}
            onClick={this.handleItemClick}
          >
            <NavLink to="/recipes/new">New Recipe</NavLink>
          </Menu.Item>
          <Menu.Item
            name="importRecipe"
            active={item === 'importRecipe'}
            onClick={this.handleItemClick}
          >
            <NavLink to="/recipes/import">Import Recipe</NavLink>
          </Menu.Item>
          <Menu.Item
            name="billing"
            active={item === 'billing'}
            onClick={this.handleItemClick}
          >
            <NavLink to="/billing">Billing</NavLink>
          </Menu.Item>
          <Menu.Item
            name="settings"
            active={item === 'settings'}
            onClick={this.handleItemClick}
          >
            <NavLink to="/settings">Settings</NavLink>
          </Menu.Item>
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
