import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signupPage = SignupPage;
  forgotPasswordPage = ForgotPasswordPage;

  onSignin(form: NgForm) {
    console.log(form);
  }

}
