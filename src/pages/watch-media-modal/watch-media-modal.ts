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
    this.media = this.navParams.get('media');

    let type = this.media.type.toLowerCase();

    if (type === 'jpg' || type === 'png') {
      this.mediaType = 'Bild';
    }
    else if (type === 'mov' || type === 'mp4') {
      this.mediaType = 'Video';
    }
    else if (type === 'amr' || type === 'mp3') {
      this.mediaType = 'Sprachnachricht';
    }
    else {
      this.mediaType = 'Bild';
    }
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
