import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Task} from "../../models/task.model";
import {TaskService} from "../../providers/task-service";
import {TaskDetailCoachView} from "../task-detail-coach-view/task-detail-coach-view";

/**
 * Generated class for the TaskDetailCoach page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task-detail-coach',
  templateUrl: 'task-detail-coach.html',
})
export class TaskDetailCoach {
  task: string;
  tasksOffen: Task[] = [];
  tasksBewerten: Task[] = [];
  tasksFertig: Task[] = [];
  tasks: Task[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private taskService: TaskService) {

    this.task = "offen";
  }

  openTask(id: number) {
    this.navCtrl.push(TaskDetailCoachView, {
      id: id
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      for (let task of this.tasks) {
        if (task.state === "offen") {
          this.tasksOffen.push(task)
        }
        if (task.state === "bewerten") {
          this.tasksBewerten.push(task)
        }
        if (task.state === "fertig") {
          this.tasksFertig.push(task)
        }
      }


    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailCoach');
  }

}
