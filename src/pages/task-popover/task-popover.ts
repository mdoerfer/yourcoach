import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'page-task-popover',
  templateUrl: 'task-popover.html',
})
export class TaskPopoverPage {

  user: any;
  doneTasks: any;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {

    this.user = this.navParams.get('user');
    this.doneTasks = this.navParams.get('doneTasks');
  }

  goToProfile() {
    this.dismissWithData({
      page: 'profile',
      user: this.user
    });
  }

  goToStatistic() {
    this.dismissWithData({
      page: 'statistic',
      doneTasks: this.doneTasks,
    });
  }

  private dismissWithData(data) {
    this.viewCtrl.dismiss(data);
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
