import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachDashboard } from './coach-dashboard';

@NgModule({
  declarations: [
    CoachDashboard,
  ],
  imports: [
    IonicPageModule.forChild(CoachDashboard),
  ],
  exports: [
    CoachDashboard
  ]
})
export class CoachDashboardModule {}
