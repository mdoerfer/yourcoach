import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SigninPage} from "../signin/signin";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signinPage = SigninPage;

  constructor(private authService: AuthService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController) {
  }

  /**
   * Signs the user up
   *
   * @param form
   */
  onSignup(form: NgForm) {
    /**
     * Create loader
     */
    let loader = this.loadingCtrl.create({
      content: "Du wirst registriert..."
    });
    loader.present();

    /**
     * Get form values
     */
    let email = form.value.email;
    let password = form.value.password;
    let name = form.value.name;

    /**
     * Sign user up
     */
    this.authService.signup(email, password)
      .then(data => {
        loader.dismiss();

        /**
         * Set display name of user
         */
        this.authService.getCurrentUser().updateProfile({
          displayName: name,
          photoURL: ''
        });

        this.showToast('Registrierung erfolgreich');
      })
      .catch(error => {
        loader.dismiss();

        this.showToast(error.message);
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
