import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-task-popover',
  templateUrl: 'task-popover.html',
})
export class TaskPopoverPage {

  user: any;

  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController,
              private navParams: NavParams) {

    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage, {user: this.user});
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
