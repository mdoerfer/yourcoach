import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-student-task-text-modal',
  templateUrl: 'student-task-text-modal.html',
})
export class StudentTaskTextModalPage implements OnInit{

  task: any;
  responseForm: FormGroup;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {

    this.task = this.navParams.get('task');

  }

  /**
   * Initialize the page
   */
  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initialize the form
   */
  private initializeForm() {

    let formData = {
      response: null,
    };

    //Create form
    this.responseForm = new FormGroup({
      response: new FormControl(formData.response, Validators.required),
    });
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
    this.viewCtrl.dismiss(this.responseForm.get('response').value);
  }


}
