import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TaskDetailCoach} from "../task-detail-coach/task-detail-coach";

/**
 * Generated class for the CoachDashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-coach-dashboard',
  templateUrl: 'coach-dashboard.html',
})
export class CoachDashboard {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //Go to TaskDetailCoachPage
  goToTaskDetailCoachPage() {
    this.navCtrl.push(TaskDetailCoach);
  }


}
