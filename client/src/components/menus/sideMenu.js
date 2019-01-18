import React from 'react';
import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

// const NavDiv = styled.div`
//   justify-content: space-evenly;
// `;

const SideMenu = () => {
  // side menu should be hidden when landing page is shown
  // Landing page is displayed when user is not loggedin and path is '/'

  if (
    window.location.pathname === '/' ||
    window.location.pathname === '/signin' ||
    window.location.pathname === '/signup'
  ) {
    return null;
  } else {
    return (
      <div className="sideMenu">
        <NavLink to="/recipes">Recipes List</NavLink>
        <NavLink to="/recipes/new">New Recipe</NavLink>
        <NavLink to="/recipes/import">Import Recipe</NavLink>

        <NavLink to="/billing">Billing</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </div>
    );
  }
};
export default SideMenu;
