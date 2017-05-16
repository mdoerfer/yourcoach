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
  taskchange: string = "open";

}
