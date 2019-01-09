// NEED TO HIDE below data
// use .env and add .env to gitignore


import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyBZCPki28TLNa9O4pbwWvHQeG0_oZD-OEs',
    authDomain: 'don-teatthat.firebaseapp.com',
    databaseURL: 'https://don-teatthat.firebaseio.com',
    projectId: 'don-teatthat',
    storageBucket: 'don-teatthat.appspot.com',
    messagingSenderId: '230245850928'
  };

  class Firebase {
      constructor(){
          app.initializeApp(config);

          this.auth = app.auth;
      }


      doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

      doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

      doSignOut = () => this.auth.signOut();
      
      doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

      doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

        
  }

  export default Firebase;