import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-task-popover',
  templateUrl: 'task-popover.html',
})
export class TaskPopoverPage {
  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController) {
  }

  goToProfile() {
    console.log('Profile clicked. View not created yet.');
    this.close();
  }

  goToStatistic() {
    console.log('Statistic clicked. View not created yet.');
    this.close();
  }

  goToDelete() {
    console.log('Delete clicked. View not created yet.');
    this.close();
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
