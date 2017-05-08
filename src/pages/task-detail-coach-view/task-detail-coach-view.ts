import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {TaskService} from "../../providers/task-service";
import {Task} from "../../models/task.model";




/**
 * Generated class for the TaskDetailCoachView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task-detail-coach-view',
  templateUrl: 'task-detail-coach-view.html',
})
export class TaskDetailCoachView {

  task: Task;

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService
      .getTasksId(this.navParams.get('id'))
      .toPromise()
      .then(task => this.task = task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailCoachView');
  }

}
