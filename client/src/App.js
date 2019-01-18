import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import './App.css';

import { withFirebase } from './components/firebase';

import MainDisplaySection from './mainDisplaySection';
import TopMenu from './components/menus/topMenu.js';
import SideMenu from './components/menus/sideMenu.js';

class App extends Component {
  // componentDidMount and componentWillUnmout is used to check if user is loggedin
  // it will make state changes when user login or out.
  // guide provide other way that remove this.  that require more higher order components.
  // but that method would be hard to use redux state management
  // it might be good to use higher order components and not using redux...

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem('uid')) {
      this.setState({ isLoggedIn: true });
    }

    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      // will make change with redux
      authUser
        ? this.setState({ isLoggedIn: true })
        : this.setState({ isLoggedIn: false });

      // ? this.setState({ authUser })
      // : this.setState({ authUser: null });
    });
  }
  componentWillUnmount() {
    this.listener();
  }
  render() {
    if (localStorage.uid) {
    }
    return (
      <StripeProvider apiKey="pk_test_Alg5oAZ6fNYUyT65GQtla9et">
        <div className="App">
          <TopMenu isLoggedIn={this.state.isLoggedIn} />
          <SideMenu />
          <MainDisplaySection />
        </div>
      </StripeProvider>
    );
  }
}

export default withFirebase(App);
