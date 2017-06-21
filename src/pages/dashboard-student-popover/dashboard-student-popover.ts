import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {RoleChoicePage} from "../role-choice/role-choice";
import {NotificationPage} from "../notification/notification";
import {SettingsPage} from "../settings/settings";
import {TaskTemplatesPage} from "../task-templates/task-templates";

@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-student-popover.html',
})
export class DashboardStudentPopoverPage {
  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController) {
  }


  goToSettings() {
    this.navCtrl.push(SettingsPage);
    this.close();
  }

  private close() {
    this.viewCtrl.dismiss();
  }
}
