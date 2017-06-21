import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {ProfilePage} from "../profile/profile";
import {StatisticsPage} from "../statistics/statistics";

@Component({
  selector: 'page-task-popover',
  templateUrl: 'task-popover.html',
})
export class TaskPopoverPage {

  user: any;
  doneTasks: any;

  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController,
              private navParams: NavParams) {

    this.user = this.navParams.get('user');
    this.doneTasks = this.navParams.get('doneTasks');

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {user: this.user});
    this.close();
  }

  goToStatistic() {
    this.navCtrl.push(StatisticsPage, {doneTasks: this.doneTasks});
    this.close();
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
