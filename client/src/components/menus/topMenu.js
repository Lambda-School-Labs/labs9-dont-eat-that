import React from 'react';
import { NavLink } from 'react-router-dom';
// import styled from 'styled-components';

// const NavDiv = styled.div`
//   justify-content: space-evenly;
// `;

const TopMenu = () => {




    return (
        <div className="topMenu">

        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Sign In</NavLink>

        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }

  export default TopMenu;