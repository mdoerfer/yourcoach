import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-coach-send-task-modal',
  templateUrl: 'coach-send-task-modal.html',
})
export class CoachSendTaskModalPage implements OnInit{


  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {


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

  /**
   * Closes text modal with data
   */
  submitForm(){
    this.viewCtrl.dismiss();
  }


}
