import {Component} from '@angular/core';
import {IonicPage, LoadingController, ToastController} from 'ionic-angular';
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
  signinPage = SigninPage;

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController) {
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
    let deleted = false;

    /**
     * Sign user up
     */
    this.authService.signup(email, password)
      .then(data => {
        /**
         * Set display name of user
         */
        this.userService.updateActiveUserRef({
          name: name,
          email: email,
          deleted: deleted,
          created_at: new Date().valueOf(),
          updated_at: new Date().valueOf()
        })
          .then(data => {
            let user = this.authService.getActiveUser();

            /**
             * Send verification email
             */
            user.sendEmailVerification()
              .then(data => {
                loader.dismiss();
                this.showToast('Registrierung erfolgreich. Bitte klicken Sie den Aktivierungs-Link in der Ihnen zugesandten Email.');
              })
              .catch(error => {
                loader.dismiss();
                this.showToast(error.message);
              });

          })
          .catch(error => {
            loader.dismiss();
            this.showToast(error.message);
          });


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
