import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';

import {CoachDashboardPage} from "../coach-dashboard/coach-dashboard";
import {StudentDashboardPage} from "../student-dashboard/student-dashboard";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-role-choice',
  templateUrl: 'role-choice.html',
})
export class RoleChoicePage {
  constructor(private userService: UserService,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

  /**
   * Sets the users currently active role in the database and opens the related dashboard
   * Shows an error toast if role choice wasn't successful
   *
   * @param role
   */
  setRole(role: string) {
    this.userService.setUserRef({
      role: role
    })
      .then(data => {
        if (role == 'coach') {
          this.navCtrl.push(CoachDashboardPage);
        }
        else if (role == 'student') {
          this.navCtrl.push(StudentDashboardPage);
        }
      })
      .catch(error => {
        this.showToast('Es gab einen Fehler bei der Rollenauswahl. Bitte versuche es erneut.');
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
