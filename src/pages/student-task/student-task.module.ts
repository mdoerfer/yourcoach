import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentTaskPage } from './student-task';

@NgModule({
  declarations: [
    StudentTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentTaskPage),
  ],
  exports: [
    StudentTaskPage
  ]
})
export class StudentTaskPageModule {}
