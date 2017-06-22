import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-watch-media-modal',
  templateUrl: 'watch-media-modal.html',
})
export class WatchMediaModalPage implements OnInit {
  mediaType: string;
  media: any;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {

  }

  ngOnInit() {
    this.mediaType = this.navParams.get('mediaType');
    this.media = this.navParams.get('media');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
