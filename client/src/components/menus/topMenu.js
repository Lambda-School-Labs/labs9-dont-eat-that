import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// TopMenu manages top part of display, showing login related menu
// Depend on user's login status, active/inactive menu changes.

const TopMenu = props => {
  let displaySignUp, displaySignIn, displaySignOut;

  if (props.isLoggedIn) {
    displaySignOut = (
      <Menu.Item>
        <NavLink to="/signout">Logout</NavLink>
      </Menu.Item>
    );
  } else {
    displaySignUp = (
      <Menu.Item>
        <NavLink to="/signup">Sign Up</NavLink>
      </Menu.Item>
    );
    displaySignIn = (
      <Menu.Item>
        <NavLink to="/signin">Login</NavLink>
      </Menu.Item>
    );
  }

  return (
    <Menu className="topMenu" size="small" inverted>
      <Menu.Menu position="right">
        {displaySignUp}
        {displaySignIn}
        {displaySignOut}
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;
