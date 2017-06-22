import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import firebase from 'firebase';
import {UserService} from "../../services/user.service";

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
  @ViewChild(Content) content: Content;
  task: any;
  chatForm: FormGroup;
  taskMsgs: any[] = [];
  uid: string;

  constructor(public navCtrl: NavController,
              public taskService: TaskService,
              public userService: UserService,
              public navParams: NavParams) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.task = this.navParams.get('task');
    this.uid = this.userService.getActiveUserId();

    this.initializeForm();
    this.updateTaskMsgs();

    //this.initializeMsgs();

  }

  /**
   * Scroll to bottom when loaded
   */
  ionViewDidEnter() {
    if(this.content._scroll) this.content.scrollToBottom(0);
  }

  /*initializeMsgs(){
    let chat = [];

    //Add tasks to matching arrays, depending on their state
    for(let t in this.task.chat) {
      let msg = chat[t];

      chat.push(msg);
    }

    console.log(chat);
    console.log(this.task.msg);
  }*/

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
      //Scroll to bottom
        if(this.content._scroll) this.content.scrollToBottom(0);
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
