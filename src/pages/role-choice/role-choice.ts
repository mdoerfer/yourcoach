import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";

import {CoachDashboardPage} from "../coach-dashboard/coach-dashboard";
import {StudentDashboardPage} from "../student-dashboard/student-dashboard";

@IonicPage()
@Component({
  selector: 'page-role-choice',
  templateUrl: 'role-choice.html',
})
export class RoleChoicePage {
  constructor(private authService: AuthService,
              private navCtrl: NavController) {
  }

  setRole(role: string) {
    this.authService.setUserRef({
      role: role
    });

    if(role == 'coach') {
      this.navCtrl.push(CoachDashboardPage);
    }
    else if(role == 'student') {
      this.navCtrl.push(StudentDashboardPage);
    }
  }

}
