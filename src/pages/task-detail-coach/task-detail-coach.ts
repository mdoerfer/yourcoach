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
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailCoach');
  }

}
