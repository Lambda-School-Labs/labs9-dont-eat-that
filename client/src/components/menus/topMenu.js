import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';


// TopMenu manages top part of display, showing login related menu
// Depend on user's login status, active/inactive menu changes.

const TopMenu = (props) => {
  let displaySignUp, displaySignIn, displaySignOut;

// using 3 variables because I could not put all in 1 variable.
// if you could make it simpler, please edit it.

    if (props.isLoggedIn){
       displaySignUp = <p>Sign Up</p>
       displaySignIn =<p>Sign In </p>
       displaySignOut =<NavLink to="/signout">Sign Out</NavLink>
    }
    else {
      displaySignUp = <NavLink to="/signup">Sign Up</NavLink> 
      displaySignIn = <NavLink to="/signin">Sign In</NavLink>
      displaySignOut = <p>Sign Out</p> 
    }
                        
    return (
        <div className="topMenu">

        {displaySignUp}
        {displaySignIn}
        {displaySignOut}
      </div>
    );
  }

  export default TopMenu;