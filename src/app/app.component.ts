import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {SignupPage} from "../pages/signup/signup";
import {RoleChoicePage} from "../pages/role-choice/role-choice";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignupPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyBpt2x5kZIDvSBs1M7uxKpwuRllO3_LjXQ",
      authDomain: "yourcoach-dc0ca.firebaseapp.com",
      databaseURL: "https://yourcoach-dc0ca.firebaseio.com",
      projectId: "yourcoach-dc0ca",
      storageBucket: "yourcoach-dc0ca.appspot.com",
      messagingSenderId: "600282368434"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.rootPage = RoleChoicePage;
      }
      else {
        this.rootPage = SignupPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

