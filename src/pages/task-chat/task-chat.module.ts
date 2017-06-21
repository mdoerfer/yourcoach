import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskChatPage } from './task-chat';

@NgModule({
  declarations: [
    TaskChatPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskChatPage),
  ],
  exports: [
    TaskChatPage
  ]
})
export class TaskChatPageModule {}
