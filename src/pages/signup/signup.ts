import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SigninPage} from "../signin/signin";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signinPage = SigninPage;

  onSignup(form: NgForm) {
    console.log(form);
  }
}
