import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from "../register-page/register-page";
import { LoginPage } from "../login-page/login-page";
import { InviteStudentPage } from "../invite-student-page/invite-student-page";
import {RollenPage} from "../rollen-page/rollen-page";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Constructor
  constructor(public navCtrl: NavController) {}

  //Go to the register page
  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  //Go to the login page
  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  //Go to the invite student page
  goToInviteStudentPage() {
    this.navCtrl.push(InviteStudentPage);
  }

  //Go to Rollenauswahl
  goToRollenPage() {
    this.navCtrl.push(RollenPage);
  }
}
