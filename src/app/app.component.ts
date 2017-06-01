import {Component, ViewChild} from '@angular/core';
import {Events, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SignupPage} from "../pages/signup/signup";
import {RoleChoicePage} from "../pages/role-choice/role-choice";
import {SigninPage} from "../pages/signin/signin";

import * as firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBpt2x5kZIDvSBs1M7uxKpwuRllO3_LjXQ",
  authDomain: "yourcoach-dc0ca.firebaseapp.com",
  databaseURL: "https://yourcoach-dc0ca.firebaseio.com",
  projectId: "yourcoach-dc0ca",
  storageBucket: "yourcoach-dc0ca.appspot.com",
  messagingSenderId: "600282368434"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignupPage;
  @ViewChild('nav') nav : NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private events: Events) {
    /**
     * Initialize Firebase
     */
    firebase.initializeApp(firebaseConfig);

    /**
     * Call platform ready events
     */
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.loadRootPage();

      splashScreen.hide();
    });
  }

  /**
   * Set the right root page depending on the authentication
   * state of the user
   */
  private loadRootPage() {
    this.events.subscribe('user:logged-in-and-verified', payload => {
      this.rootPage = RoleChoicePage;
      this.nav.pop();
    });

    this.events.subscribe('user:logged-in-unverified', payload => {
      this.rootPage = SigninPage;
      this.nav.pop();
    });

    this.events.subscribe('user:logged-in-but-deleted', payload => {
      this.rootPage = SigninPage;
      this.nav.pop();
    });

    this.events.subscribe('user:not-logged-in', () => {
      this.rootPage = SignupPage;
      this.nav.pop();
    });
  }
}

