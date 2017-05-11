import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoleChoicePage } from './role-choice';

@NgModule({
  declarations: [
    RoleChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(RoleChoicePage),
  ],
  exports: [
    RoleChoicePage
  ]
})
export class RoleChoicePageModule {}
