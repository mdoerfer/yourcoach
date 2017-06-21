import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";

/**
 * Generated class for the TaskChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-task-chat',
  templateUrl: 'task-chat.html',
})
export class TaskChatPage implements OnInit  {

  task: any[];
  chatForm: FormGroup;
  taskMsgs: any[];

  constructor(public navCtrl: NavController,
              public taskService: TaskService,
              public navParams: NavParams) {
  }

  ngOnInit() {
    this.task = this.navParams.get('task');
    this.initializeForm();
    this.initializeTaskMsgs();
    console.log();

  }

  /**
   * Initialize the form
   */
  private initializeForm() {
    let formData = {
      msg: null,
    };


    //Create form
    this.chatForm = new FormGroup({
      msg: new FormControl(formData.msg)
    });


  }

  initializeTaskMsgs(){

    if(this.task["chat"] !== null){
      this.taskMsgs = this.task["chat"];
    }

  }

  /**
   *
   */
  submitForm() {
      console.log(this.task["title"]);
      this.taskService.sendTaskChatMessage(this.task, this.chatForm.get('msg').value);
  }



}
