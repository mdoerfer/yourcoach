import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteStudentPage } from './invite-student-page';

@NgModule({
  declarations: [
    InviteStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteStudentPage),
  ],
  exports: [
    InviteStudentPage
  ]
})
export class InviteStudentPageModule {}
