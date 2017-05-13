import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {SignupPage} from "../pages/signup/signup";
import {RoleChoicePage} from "../pages/role-choice/role-choice";
import {SigninPage} from "../pages/signin/signin";
import {UserService} from "../services/user.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignupPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private userService: UserService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBpt2x5kZIDvSBs1M7uxKpwuRllO3_LjXQ",
      authDomain: "yourcoach-dc0ca.firebaseapp.com",
      databaseURL: "https://yourcoach-dc0ca.firebaseio.com",
      projectId: "yourcoach-dc0ca",
      storageBucket: "yourcoach-dc0ca.appspot.com",
      messagingSenderId: "600282368434"
    });

    firebase.auth().onAuthStateChanged(user => {
      this.setRootPage();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      //Set root page on app init
      this.setRootPage();

      splashScreen.hide();
    });
  }

  /**
   * Set the right root page depending on the authentication
   * state of the user
   */
  private setRootPage() {
    let user = this.userService.getUser();

    //If user is logged in and verified
    if(user && user.emailVerified) {
      this.rootPage = RoleChoicePage;

      //TODO: If setting "Dont show role choice on app open" is false open RoleDashboard, else open RoleChoicePage
    }
    //If user is logged in but not verified
    else if(user && !user.emailVerified) {
      this.rootPage = SigninPage;
    }
    //If user is null
    else {
      this.rootPage = SignupPage;
    }
  }
}

