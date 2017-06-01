import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'page-edit-profile-modal',
  templateUrl: 'edit-profile-modal.html',
})
export class EditProfileModalPage implements OnInit {

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
      aboutMe: null,
      dateOfBirth: null
    };


    //Prefill form with task data if we're in edit mode
    formData.name = this.navParams.get("user").name;
    formData.aboutMe = this.navParams.get("user").aboutMe;
    formData.dateOfBirth = this.navParams.get("user").dateOfBirth;


    //Create form
    this.profileForm = new FormGroup({
      name: new FormControl(formData.name),
      aboutMe: new FormControl(formData.aboutMe),
      dateOfBirth: new FormControl(formData.dateOfBirth),
    });

    console.log(this.profileForm);

  }


  /**
   * Closes text modal
   */
  dismissModal() {
    this.viewCtrl.dismiss();

  }

  /**
   * Closes text modal with data
   */
  submitForm() {
    this.viewCtrl.dismiss(this.profileForm);
  }


}
