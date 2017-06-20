import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  doneTasks: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.doneTasks = this.navParams.get('doneTasks');
    console.log(this.doneTasks);
  }



}
