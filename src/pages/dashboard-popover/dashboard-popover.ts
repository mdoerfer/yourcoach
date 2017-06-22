import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-popover.html',
})

export class DashboardPopoverPage {
  constructor(public viewCtrl: ViewController) {
  }

  goToTaskTemplates() {
    this.dismissWithData({
      page: 'task-templates'
    });
  }

  goToSettings() {
    this.dismissWithData({
      page: 'settings'
    });
  }

  private dismissWithData(data) {
    this.viewCtrl.dismiss(data);
  }
}
