import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailCoach } from './task-detail-coach';

@NgModule({
  declarations: [
    TaskDetailCoach,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailCoach),
  ],
  exports: [
    TaskDetailCoach
  ]
})
export class TaskDetailCoachModule {}
