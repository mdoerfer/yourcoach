import {Component} from '@angular/core';
import {Events, IonicPage, ModalController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AlertController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {NavController} from "ionic-angular";
import {RoleChoicePage} from "../role-choice/role-choice";
import {EditProfileModalPage} from "../edit-profile-modal/edit-profile-modal";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private events: Events) {
  }


  /**
   * Shows modal for edit profile
   */
  showModalEditProfile() {
    let editProfileModal = this.modalCtrl.create(EditProfileModalPage);
    editProfileModal.present();

    //TODO: Implement onDidDismiss()
  }

  /**
   * Confirm deletion
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
   * Soft-deletes a user
   */
  deleteUser() {
    this.userService.deleteUser();

    this.events.subscribe('user:delete-success', (payload) => {
      console.log(payload.message);
      this.signOut();
    });

    this.events.subscribe('user:delete-failed', (payload) => {
      console.log(payload.message);
    })
  }

  /**
   * Sign a user out
   */
  signOut() {
    this.navCtrl.pop();
    this.authService.signout();
  }

  /**
   *  Open role choice page
   */
  goToRoleChoice() {
    this.navCtrl.push(RoleChoicePage);
  }

}
