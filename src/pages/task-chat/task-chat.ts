import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import firebase from 'firebase';

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
  task: any;
  chatForm: FormGroup;
  taskMsgs: any[] = [];

  constructor(public navCtrl: NavController,
              public taskService: TaskService,
              public navParams: NavParams) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.task = this.navParams.get('task');

    this.initializeForm();
    this.updateTaskMsgs();
  }

  /**
   * Read task messages on initial load
   * and add listener for changes
   */
  updateTaskMsgs(){
    let nodeName: string = '/tasks/'+this.task._id+ '/chat/';

    let query = firebase.database()
      .ref(nodeName);

      query.on('value', snapshot => {
      let dbChat = snapshot.val();
      let chat = [];

      //Add tasks to matching arrays, depending on their state
        for(let msgId in dbChat) {
          let msg = dbChat[msgId];

          chat.push(msg);
        }

      //Update state
      this.taskMsgs = chat;
    })
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

  /**
   * Submit chat message
   */
  submitForm() {
      this.taskService.sendTaskChatMessage(this.task, this.chatForm.get('msg').value);
      this.chatForm.reset()
  }



}
