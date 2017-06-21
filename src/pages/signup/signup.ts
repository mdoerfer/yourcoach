import {Component} from '@angular/core';
import {Events, IonicPage, LoadingController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SigninPage} from "../signin/signin";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  loader;
  signinPage = SigninPage;

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private events: Events) {
    this.createLoader();
    this.subscribeSignup();
  }

  /**
   * Instantiate loader
   */
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Du wirst registriert..."
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
   * Signs the user up
   *
   * @param form
   */
  onSignup(form: NgForm) {
    this.loader.present().then(() => {
      /**
       * Get form values
       */
      let email = form.value.email;
      let password = form.value.password;
      let name = form.value.name;

      /**
       * Sign user up
       */
      this.authService.signup(name, email, password);
    });
  }

  subscribeSignup() {
    //Subscribe to signup success
    this.events.subscribe('auth:signup-success', payload => {
      this.dismissLoader();
      this.showToast(payload.message);
    });

    //Subscribe to signup failure
    this.events.subscribe('auth:signup-failed', payload => {
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
