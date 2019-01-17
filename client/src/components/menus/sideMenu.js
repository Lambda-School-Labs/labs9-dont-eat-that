import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavDiv = styled.div`
  justify-content: space-evenly;
`;

const SideMenu = () => {



if (localStorage.uid && window.location.pathname !== '/') {
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

  else {
    return(
      <div></div>
    );
  }
}
  export default SideMenu;