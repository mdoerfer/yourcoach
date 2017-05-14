import {Component} from '@angular/core';
import {IonicPage, LoadingController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SignupPage} from "../signup/signup";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  signupPage = SignupPage;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  /**
   * Resets the users password
   *
   * @param form
   */
  onResetPassword(form: NgForm) {
    /**
     * Create loader
     */
    let loader = this.loadingCtrl.create({
      content: "Passwort wird zurückgesetzt..."
    });
    loader.present();

    /**
     * Get form values
     */
    let email = form.value.email;

    /**
     * Send reset password email
     */
    this.authService.resetPassword(email)
      .then(data => {
        loader.dismiss();

        this.showToast('Ein Mail zum Zurücksetzen Ihres Passwortes wurde versandt.');
      })
      .catch(error => {
        loader.dismiss();

        this.showToast(error.message);
      })
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
