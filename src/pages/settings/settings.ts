import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavParams, ToastController} from 'ionic-angular';
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

  user: any;

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              private events: Events) {

    this.subscribeDeleteUser();
    this.subscribePasswordChange();
    this.initializeUser();
  }

  /**
   * Get user info
   */
  initializeUser() {
    this.userService.getActiveUserRef().once('value',
      snapshot => {
        this.user = snapshot.val();
      });
  }

  /**
   * Shows modal for edit profile
   */
  showModalEditProfile() {
    let editProfileModal = this.modalCtrl.create(EditProfileModalPage, {user: this.user});
    editProfileModal.present();

    editProfileModal.onDidDismiss(data => {
      if (data) {
        this.userService.updateActiveUserRef({
          name: data.get('name').value,
          aboutMe: data.get('aboutMe').value,
          dateOfBirth: data.get('dateOfBirth').value,
        })
          .then(data => {
            this.showToast("Profil wurde gespeichert");
            this.initializeUser();
          })
          .catch(error => {
            this.showToast(error.message);
          });

      }
    });

  }

  /**
   * Confirm deletion
   */
  showDeleteUserConfirm() {
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
            this.showDeleteUserPrompt();
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Sign a user out
   */
  signOut() {
    this.navCtrl.popToRoot();
    this.authService.signout();
  }

  /**
   *  Open role choice page
   */
  goToRoleChoice() {
    this.navCtrl.push(RoleChoicePage);
  }

  /**
   * Show feedback prompt
   */
  showFeedbackPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Gefällt dir diese App',
      message: "Gib uns eine Bewertung im AppStore",
      buttons: [
        {
          text: 'Nicht Jetzt',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Bewerten',
          handler: data => {

          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Show change password Prompt
   */
  showChangePasswordPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Passwort ändern',
      message: "Ändere dein Passwort",
      inputs: [
        {
          type: 'password',
          name: 'oldPass',
          placeholder: "Altes Paswort"
        },
        {
          type: 'password',
          name: 'newPass',
          placeholder: "Neues Passwort"

        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Senden',
          handler: data => {
            this.authService.changePassword(data.oldPass, data.newPass);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Show delete user prompt
   */
  showDeleteUserPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Konto löschen',
      message: "Gib dein Passwort ein um dein Konto zu löschen",
      inputs: [
        {
          type: 'password',
          name: 'pass',
          placeholder: "Passwort"
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Senden',
          handler: data => {
            this.authService.deleteUser(data.pass);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Subscribe to password change
   */
  subscribePasswordChange() {
    this.events.subscribe('auth:change-password-success', payload => {
      this.showToast(payload.message);
    });

    this.events.subscribe('auth:change-password-failed', payload => {
      this.showToast(payload.message);
    });
  }

  /**
   * Subscribe to user deletion
   */
  subscribeDeleteUser() {
    this.events.subscribe('auth:delete-user-success', (payload) => {
      this.showToast(payload.message);
      this.navCtrl.popToRoot();
    });

    this.events.subscribe('auth:delete-user-failed', (payload) => {
      this.showToast(payload.message);
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
