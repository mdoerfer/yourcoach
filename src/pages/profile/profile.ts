import { Component } from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {AlertController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {NavController} from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }



}
