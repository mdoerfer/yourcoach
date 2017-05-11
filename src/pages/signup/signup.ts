import {Component} from '@angular/core';
import {IonicPage, ToastController} from 'ionic-angular';
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
              private toastCtrl: ToastController) {
  }

  /**
   * Signs the user up
   *
   * @param form
   */
  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    this.authService.signup(email, password)
      .then(data => {
        this.showToast('Registrierung erfolgreich');
      })
      .catch(error => {
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
