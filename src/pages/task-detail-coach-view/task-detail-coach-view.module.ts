import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailCoachView } from './task-detail-coach-view';

@NgModule({
  declarations: [
    TaskDetailCoachView,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailCoachView),
  ],
  exports: [
    TaskDetailCoachView
  ]
})
export class TaskDetailCoachViewModule {}
