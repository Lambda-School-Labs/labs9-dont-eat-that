import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// TopMenu manages top part of display, showing login related menu
// Depend on user's login status, active/inactive menu changes.

const TopMenu = props => {
  let displaySignUp, displaySignIn, displaySignOut;

  if (props.isLoggedIn) {
    displaySignOut = (
      <NavLink to="/signout">
        <Menu.Item>Logout</Menu.Item>
      </NavLink>
    );
  } else {
    displaySignUp = (
      <NavLink to="/signup">
        <Menu.Item>Sign Up</Menu.Item>
      </NavLink>
    );
    displaySignIn = (
      <NavLink to="/signin">
        <Menu.Item>Login</Menu.Item>
      </NavLink>
    );
  }

  return (
    <Menu className="topMenu" size="small" inverted>
      <NavLink to="/">
        <Menu.Item>Landing Page</Menu.Item>
      </NavLink>
      <Menu.Menu position="right">
        {displaySignUp}
        {displaySignIn}
        {displaySignOut}
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;
