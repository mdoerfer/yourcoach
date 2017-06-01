import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";


@Component({
  selector: 'edit-profile-modal',
  templateUrl: 'edit-profile-modal.html',
})
export class EditProfileModalPage implements OnInit{


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
