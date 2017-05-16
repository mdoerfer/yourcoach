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

  goToRProfilePage() {
    console.log('Profile clicked. View not created yet.');
  }

  goToStatistic() {
    console.log('Statistic clicked. View not created yet.');
  }

  goToDelete() {
    console.log('Delete clicked. View not created yet.');
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
