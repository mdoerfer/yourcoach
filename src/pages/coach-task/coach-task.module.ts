import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachTaskPage } from './coach-task';

@NgModule({
  declarations: [
    CoachTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachTaskPage),
  ],
  exports: [
    CoachTaskPage
  ]
})
export class CoachTaskPageModule {}
