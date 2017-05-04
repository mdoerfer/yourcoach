import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudentDasboard} from "../student-dasboard/student-dasboard";
import {CoachDashboard} from "../coach-dashboard/coach-dashboard";

/**
 * Generated class for the RollenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rollen-page',
  templateUrl: 'rollen-page.html',
})
export class RollenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //Go to the Student page
  goToStudentDashboard() {
    this.navCtrl.push(StudentDasboard);
  }

  //Go to the Coach page
  goToCoachDashboard() {
    this.navCtrl.push(CoachDashboard);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollenPage');
  }

}
