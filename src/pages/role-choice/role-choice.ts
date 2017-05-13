import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

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
              private navCtrl: NavController) {
  }

  setRole(role: string) {
    this.userService.setUserRef({
      role: role
    });

    if (role == 'coach') {
      this.navCtrl.push(CoachDashboardPage);
    }
    else if (role == 'student') {
      this.navCtrl.push(StudentDashboardPage);
    }
  }

}
