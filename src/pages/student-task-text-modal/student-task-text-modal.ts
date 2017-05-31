import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {StudentTaskPage} from "../student-task/student-task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'page-student-task-text-modal',
  templateUrl: 'student-task-text-modal.html',
})
export class StudentTaskTextModalPage {

  task: any;

  constructor(public viewCtrl: ViewController,
              private authService: AuthService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private taskService: TaskService) {

    this.task = this.navParams.get('task');

  }

  closeModal(){

    //this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }


}
