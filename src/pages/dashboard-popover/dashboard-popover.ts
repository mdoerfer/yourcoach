import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {RoleChoicePage} from "../role-choice/role-choice";
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

  goToRoleChoice() {
    this.navCtrl.push(RoleChoicePage);
    this.close();
  }

  goToTaskTemplates() {
    console.log('Task Templates clicked. View not created yet.');
  }

  goToNotifications() {
    console.log('Benachrichtigungen clicked. View not created yet.');
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
    this.close();
  }

  signOut() {
    this.authService.signout();
    this.close();
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
