import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskTemplatesPage } from './task-templates';

@NgModule({
  declarations: [
    TaskTemplatesPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskTemplatesPage),
  ],
  exports: [
    TaskTemplatesPage
  ]
})
export class TaskTemplatesPageModule {}
