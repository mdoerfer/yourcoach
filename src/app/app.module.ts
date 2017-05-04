import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from "../pages/register-page/register-page";
import { LoginPage } from "../pages/login-page/login-page";
import { InviteStudentPage } from "../pages/invite-student-page/invite-student-page";
import {RollenPage} from "../pages/rollen-page/rollen-page";
import {CoachDashboard} from "../pages/coach-dashboard/coach-dashboard";
import {StudentDasboard} from "../pages/student-dasboard/student-dasboard";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    InviteStudentPage,
    RollenPage,
    CoachDashboard,
    StudentDasboard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    InviteStudentPage,
    RollenPage,
    CoachDashboard,
    StudentDasboard
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
