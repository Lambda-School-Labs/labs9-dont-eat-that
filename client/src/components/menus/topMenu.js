import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Responsive } from 'semantic-ui-react';

import ourColors from '../../ColorScheme';

// TopMenu manages top part of display, showing login related menu
// Depend on user's login status, active/inactive menu changes.

const TopMenu = props => {
  let displaySignUp, displaySignIn, displaySignOut, displayMenu;

  displayMenu =
    window.location.pathname === '/' ? null : (
      <Responsive maxWidth={770}>
        <Dropdown item text='Menu'>
          <Dropdown.Menu>
            <NavLink to='/recipes'>
              <Dropdown.Item
                style={{
                  background: ourColors.menuColor,
                  borderBottom: '1px solid black'
                }}
              >
                Recipes List
              </Dropdown.Item>
            </NavLink>
            <NavLink to='/recipes/new'>
              <Dropdown.Item
                style={{
                  background: ourColors.menuColor,
                  borderBottom: '1px solid black'
                }}
              >
                New Recipe
              </Dropdown.Item>
            </NavLink>
            <NavLink to='/recipes/import'>
              <Dropdown.Item
                style={{
                  background: ourColors.menuColor,
                  borderBottom: '1px solid black'
                }}
              >
                Import Recipes
              </Dropdown.Item>
            </NavLink>
            <NavLink to='/billing'>
              <Dropdown.Item
                style={{
                  background: ourColors.menuColor,
                  borderBottom: '1px solid black'
                }}
              >
                Billing
              </Dropdown.Item>
            </NavLink>
            <NavLink to='/settings'>
              <Dropdown.Item style={{ background: ourColors.menuColor }}>
                Settings
              </Dropdown.Item>
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>
      </Responsive>
    );

  if (props.isLoggedIn) {
    displaySignOut = (
      <NavLink to='/signout'>
        <Menu.Item>Logout</Menu.Item>
      </NavLink>
    );
  } else {
    displaySignUp = (
      <NavLink to='/signup'>
        <Menu.Item>Signup</Menu.Item>
      </NavLink>
    );
    displaySignIn = (
      <NavLink to='/signin'>
        <Menu.Item>Login</Menu.Item>
      </NavLink>
    );
  }

  // const SiteIcon =
  //   window.location.pathname === '/' ? null : (
  //     <img
  //       src={require('../../images/forbidden-cake.png')}
  //       alt='site icon'
  //       style={{ marginRight: '10px' }}
  //     />
  //   );

  return (
    <Menu
      className='topMenu'
      size='small'
      style={{
        background: ourColors.menuColor,
        position: 'fixed',
        zIndex: '10'
      }}
    >
      <Responsive minWidth={771}>
        <NavLink to='/'>
          <Menu.Item
            style={
              window.location.pathname === '/'
                ? { fontFamily: 'Montserrat' }
                : {
                    width: '240px',
                    marginLeft: '1.5px',
                    fontFamily: 'Montserrat'
                  }
            }
          >
            Smart Recipez
          </Menu.Item>
        </NavLink>
      </Responsive>
      <Responsive maxWidth={770}>
        <NavLink to='/'>
          <Menu.Item
            style={
              window.location.pathname === '/'
                ? { fontFamily: 'Montserrat' }
                : {
                    marginLeft: '1.5px',
                    fontFamily: 'Montserrat'
                  }
            }
          >
            SR
          </Menu.Item>
        </NavLink>
      </Responsive>
      <Menu.Menu position='right'>
        {displaySignUp}
        {displaySignIn}
        {displayMenu}
        {displaySignOut}
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;
