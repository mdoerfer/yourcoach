import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'page-edit-profile-modal',
  templateUrl: 'edit-profile-modal.html',
})
export class EditProfileModalPage implements OnInit{

  profileForm: FormGroup;


  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {


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
      name: null,
      description: null,
    };


    //Create form
    this.profileForm = new FormGroup({
      name: new FormControl(formData.name, Validators.required),
      description: new FormControl(formData.description, Validators.required),
    });

    console.log(this.profileForm);

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
