import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RollenPage } from './rollen-page';

@NgModule({
  declarations: [
    RollenPage,
  ],
  imports: [
    IonicPageModule.forChild(RollenPage),
  ],
  exports: [
    RollenPage
  ]
})
export class RollenPageModule {}
