import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, PopoverController} from 'ionic-angular';
import {CreateTaskPage} from "../create-task/create-task";
import {TaskPopoverPage} from "../task-popover/task-popover";

@IonicPage()
@Component({
  selector: 'page-coach-task',
  templateUrl: 'coach-task.html',
})
export class CoachTaskPage implements OnInit {
  createTaskPage = CreateTaskPage;

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
  taskchange: string = "open";

  constructor(private navParams: NavParams,
              private popoverCtrl: PopoverController) {}

  toggle(task: any) {
    task.open = !task.open;
  }

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

