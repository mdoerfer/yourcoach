import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-student-popover.html',
})
export class DashboardStudentPopoverPage {
  constructor(public viewCtrl: ViewController) {
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
