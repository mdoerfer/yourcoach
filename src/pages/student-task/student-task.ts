import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, PopoverController} from 'ionic-angular';
import {TaskPopoverPage} from "../task-popover/task-popover";

@IonicPage()
@Component({
  selector: 'page-student-task',
  templateUrl: 'student-task.html',
})
export class StudentTaskPage implements OnInit {
  activeTab: string = "open";

  constructor(private navParams: NavParams,
              private popoverCtrl: PopoverController) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    console.log(this.navParams.data);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
