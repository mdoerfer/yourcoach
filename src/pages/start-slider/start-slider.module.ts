import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartSliderPage } from './start-slider';

@NgModule({
  declarations: [
    StartSliderPage,
  ],
  imports: [
    IonicPageModule.forChild(StartSliderPage),
  ],
  exports: [
    StartSliderPage
  ]
})
export class StartSliderPageModule {}
