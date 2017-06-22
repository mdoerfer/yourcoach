import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchMediaModalPage } from './watch-media-modal';

@NgModule({
  declarations: [
    WatchMediaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchMediaModalPage),
  ],
  exports: [
    WatchMediaModalPage
  ]
})
export class WatchMediaModalPageModule {}
