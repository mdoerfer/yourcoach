import {Component} from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-popover.html',
})
export class DashboardPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
