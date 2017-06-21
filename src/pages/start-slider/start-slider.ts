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
      title: "Willkommen zu YOURCOACH!",
      description: "Mit <b>YOURCOACH</b> bleiben Coach und Schüler im engen Kontakt beim Training. Ob Sport, Musik oder Malerei -  alles ist möglich!",
      image: "assets/images/slide1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/images/slide2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/images/slide3.png",
    }
  ];

  goToRoleChoice() {
    this.navCtrl.push(RoleChoicePage);
  }

}
