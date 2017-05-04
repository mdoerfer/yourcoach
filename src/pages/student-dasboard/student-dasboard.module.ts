import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDasboard } from './student-dasboard';

@NgModule({
  declarations: [
    StudentDasboard,
  ],
  imports: [
    IonicPageModule.forChild(StudentDasboard),
  ],
  exports: [
    StudentDasboard
  ]
})
export class StudentDasboardModule {}
