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

  toggle(task: any) {
    task.open = !task.open;
  }
}

