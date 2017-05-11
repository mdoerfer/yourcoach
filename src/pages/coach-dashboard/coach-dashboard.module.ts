import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachDashboardPage } from './coach-dashboard';

@NgModule({
  declarations: [
    CoachDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachDashboardPage),
  ],
  exports: [
    CoachDashboardPage
  ]
})
export class CoachDashboardPageModule {}
