import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'page-student-task-video-modal',
  templateUrl: 'student-task-video-modal.html',
})
export class StudentTaskVideoModalPage implements OnInit{

  task: any;
  response: any = null;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {

    this.task = this.navParams.get('task');
  }

  /**
   * Initialize the page
   */
  ngOnInit() {

  }

  /**
   * Closes text modal
   */
  dismissModal(){
    this.viewCtrl.dismiss();

  }


}
