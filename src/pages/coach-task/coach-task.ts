import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {CreateTaskPage} from "../create-task/create-task";
import {TaskPopoverPage} from "../task-popover/task-popover";

@IonicPage()
@Component({
  selector: 'page-coach-task',
  templateUrl: 'coach-task.html',
})
export class CoachTaskPage {
  createTaskPage = CreateTaskPage;
  activeTab: string = "open";

  //Dummy data for tasks
  tasks: any[] = [
    {
      title: 'Task1',
      description: 'Du musst was tun',
      answer: 'Per Nachricht',
      duration: '11Std',
      difficulty: 'hard',
      state: 'open',
      authorid: '#1',
      open: false
    },
    {
      title: 'Task2',
      description: 'Du musst was tun',
      answer: 'Per Nachricht',
      duration: '2T',
      difficulty: 'medium',
      state: 'grade',
      authorid: '#1',
      open: false
    }
  ];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController) {}

  /**
   * Open task page with tasks for student
   *
   * @param i
   */
  goToCreateTask() {
    this.navCtrl.push(CreateTaskPage, {
      sid: this.navParams.get('sid')
    });
  }

  toggle(task: any) {
    task.open = !task.open;
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

