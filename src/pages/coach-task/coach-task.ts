import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {CreateTaskPageModule} from "../create-task/create-task.module";
import {CreateTaskPage} from "../create-task/create-task";

@IonicPage()
@Component({
  selector: 'page-coach-task',
  templateUrl: 'coach-task.html',
})
export class CoachTaskPage {
  createTaskPage = CreateTaskPage;
  tasks: any[] = [
    {
      title: 'Task1',
      description: 'Du musst was tun',
      answer: 'Per Nachricht',
      date: '10.05.2017',
      open: false
    },
    {
      title: 'Task2',
      description: 'Du musst was tun',
      answer: 'Per Nachricht',
      date: '12.05.2017',
      open: false
    }
  ];
  taskchange: string = "open";

  toggle(task: any) {
    task.open = !task.open;
  }
}
