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
  activeSince: string;

  countEasy: number;
  countMiddle: number;
  countHard: number;

  percentEasy: number;
  percentMiddle: number;
  percentHard: number;

  averageRating: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

    this.doneTasks = this.navParams.get('doneTasks');

    this.calculateActiveSince();
    this.countDiffuculty();
    this.calculatePercentageDifficulty();
    this.calculateAverageRating();
  }

  calculateActiveSince(){
    let min = new Date().valueOf();

    for(let i = 0; i < this.doneTasks.length; i++){
      if (min >= this.doneTasks[i].created_at){
        min = this.doneTasks[i].created_at;

      }
    }
    let d = new Date(min);
    this.activeSince = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
  }

  countDiffuculty(){
    let countEasy = 0;
    let countMiddle = 0;
    let countHard = 0;

    for(let i = 0; i < this.doneTasks.length; i++){

      switch(this.doneTasks[i].difficulty) {
        case 'Einfach':
          countEasy++;
          break;
        case 'Mittel':
          countMiddle++;
          break;
        case 'Schwer':
          countHard++;
      }
    }
    this.countEasy = countEasy;
    this.countMiddle = countMiddle;
    this.countHard = countHard;
  }

  calculatePercentageDifficulty(){
    this.percentEasy = Math.round(this.countEasy / this.doneTasks.length * 100);
    this.percentMiddle = Math.round(this.countMiddle / this.doneTasks.length * 100);
    this.percentHard = Math.round(this.countHard / this.doneTasks.length * 100);
  }

  calculateAverageRating(){
    let rating = 0;

    for(let i = 0; i < this.doneTasks.length; i++){
      rating += this.doneTasks[i].rating;
      }

      this.averageRating = Math.round(rating / this.doneTasks.length *10) / 10;

    }


}
