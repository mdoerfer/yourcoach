import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RoleChoicePage} from "../role-choice/role-choice";

/**
 * Generated class for the StartSliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-start-slider',
  templateUrl: 'start-slider.html',
})
export class StartSliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartSliderPage');
  }

  slides = [
    {
      title: "Willkommen zu YOUR COACH!",
      description: "Mit <b>YOUR COACH</b> bleiben Coach und Schüler im engen Kontakt beim Training.",
      image: "assets/images/slide1.png",
    },
    {
      title: "Deinen Coach immer in der Tasche",
      description: "Du willst auch trainieren, wenn dein Personal Coach nicht dabei ist? Verbinde dich mit <b>deinem Coach</b> und erhalte Aufgaben.",
      image: "assets/images/slide2.png",
    },
    {
      title: "Näher an den Schülern",
      description: "Du bist Coach und willst deine Schüler rund um die Uhr betreuen? Lade <b>deine Schüler</b> ein und vergib Aufgaben.",
      image: "assets/images/slide3.png",
    }
  ];

  goToRoleChoice() {
    this.navCtrl.push(RoleChoicePage);
  }

}
