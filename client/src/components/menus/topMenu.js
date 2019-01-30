import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Responsive } from 'semantic-ui-react';
// import SimpleSearchInput from '../util/simpleSearch';
import ourColors from '../../ColorScheme';
import { MenuSearch } from '../styleComponents/navigationStyles';

// TopMenu manages top part of display, showing login related menu
// Depend on user's login status, active/inactive menu changes.

const TopMenu = props => {
  let displaySignUp, displaySignIn, displaySignOut, displayMenu;

  if (props.isLoggedIn) {
    displayMenu = (
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
    displaySignOut = (
      <NavLink to='/signout'>
        <Menu.Item>Logout</Menu.Item>
      </NavLink>
    );
  } else {
    displaySignUp = (
      <NavLink to='/signup'>
        <Menu.Item>Sign Up</Menu.Item>
      </NavLink>
    );
    displaySignIn = (
      <NavLink to='/signin'>
        <Menu.Item>Login</Menu.Item>
      </NavLink>
    );
  }

  const SiteIcon =
    window.location.pathname === '/' ? null : (
      <img
        src={require('../../images/forbidden-cake.png')}
        alt='site icon'
        style={{ marginRight: '10px' }}
      />
    );

  return (
    <Menu
      className='topMenu'
      size='small'
      style={{ background: ourColors.menuColor }}
    >
      {/* <div className='navigationContainer'> */}
        <NavLink to='/'>
          <Menu.Item
            style={
              window.location.pathname === '/'
                ? {}
                : {
                    padding: '5px',
                    paddingRight: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '2000px',
                    margin: '0 auto'
                  }
            }
          >
            {SiteIcon}
            Don't Eat That
          </Menu.Item>
        </NavLink>
        {/* <div className='searchLogout'> */}
        {/* <MenuSearch class='minWidth={771}'>
        <SimpleSearchInput/>
        </MenuSearch> */}

        <Menu.Menu position='right'>
          {displaySignUp}
          {displaySignIn}
          {displayMenu}
          {displaySignOut}
        </Menu.Menu>

        {/* </div>
      </div> */}
    </Menu>
  );
};

export default TopMenu;
