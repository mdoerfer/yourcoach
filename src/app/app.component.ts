import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {SignupPage} from "../pages/signup/signup";
import {RoleChoicePage} from "../pages/role-choice/role-choice";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignupPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBpt2x5kZIDvSBs1M7uxKpwuRllO3_LjXQ",
      authDomain: "yourcoach-dc0ca.firebaseapp.com",
      databaseURL: "https://yourcoach-dc0ca.firebaseio.com",
      projectId: "yourcoach-dc0ca",
      storageBucket: "yourcoach-dc0ca.appspot.com",
      messagingSenderId: "600282368434"
    });

    firebase.auth().onAuthStateChanged(user => {
      this.setRootPage(user);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    //Set root page on app init
    this.setRootPage(this.authService.getCurrentUser());
  }

  private setRootPage(user) {
    //If user is logged in and verified
    if(user && user.emailVerified) {
      this.rootPage = RoleChoicePage;
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

