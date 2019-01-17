import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavDiv = styled.div`
  justify-content: space-evenly;
`;

const TopMenu = () => {




    return (
        <NavDiv>

        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>

        <NavLink to="/signout">Sign Out</NavLink>
      </NavDiv>
    );
  }

  export default TopMenu;