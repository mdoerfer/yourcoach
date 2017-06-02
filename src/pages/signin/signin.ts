import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  loader;
  signupPage = SignupPage;
  forgotPasswordPage = ForgotPasswordPage;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private events: Events) {
    this.createLoader();
    this.subscribeSignin();
  }

  /**
   * Instantiate loader
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Du wirst eingeloggt..."
    });
  }

  /**
   * Dismiss loader
   */
  dismissLoader() {
    this.loader.dismiss();
    this.createLoader();
  }

  /**
   * Signs the user in
   *
   * @param form
   */
  onSignin(form: NgForm) {
    this.loader.present().then(() => {
      /**
       * Get form values
       */
      let email = form.value.email;
      let password = form.value.password;

      /**
       * Sign user in
       */
      this.authService.signin(email, password);
    });

  }

  subscribeSignin() {
    this.events.subscribe('auth:signin-verified', payload => {
      this.dismissLoader();
      this.showToast(payload.message);
    });

    this.events.subscribe('auth:signin-unverified', payload => {
      this.dismissLoader();
      this.showToast(payload.message);
    });

    this.events.subscribe('auth:signin-failed', payload => {
      this.dismissLoader();
      this.showToast(payload.message);
    });
  }

  /**
   * Shows a short toast message
   *
   * @param msg
   * @param duration
   */
  private showToast(msg: string, duration: number = 3000) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }
}
