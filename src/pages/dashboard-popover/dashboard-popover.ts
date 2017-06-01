import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {RoleChoicePage} from "../role-choice/role-choice";
import {NotificationPage} from "../notification/notification";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-popover.html',
})
export class DashboardPopoverPage {
  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController) {
  }

  goToTaskTemplates() {
    console.log('Task Templates clicked. View not created yet.');
    this.close();
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
    this.close();
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
