import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AlertController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {NavController} from "ionic-angular";
import {SignupPage} from "../signup/signup";
import {root} from "rxjs/util/root";
import {RoleChoicePage} from "../role-choice/role-choice";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              public alertCtrl: AlertController) {
  }

  /**
   * Open alert for backup
   */

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Account löschen',
      message: 'Möchtest du deinen Account wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            this.deleteUser();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Sets the users currently active role in the database and opens the related dashboard
   * Shows an error toast if role choice wasn't successful
   *
   * @param role
   */
  deleteUser() {
    this.userService.updateActiveUserRef({
      deleted: "true"
    })
      .then(data => {
        this.authService.signout();
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log("nicht gelöscht");
        //this.showToast('Es gab einen Fehler beim Löschen. Bitte versuche es erneut.');
      });
  }

  signOut() {
    this.authService.signout();
    this.navCtrl.pop();
  }

  /**
   *
   */
  goToRoleChoice(){
    this.navCtrl.push(RoleChoicePage);
  }

}
