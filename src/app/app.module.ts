import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import {AuthService} from "../services/auth.service";
import {RoleChoicePage} from "../pages/role-choice/role-choice";
import {CoachDashboardPage} from "../pages/coach-dashboard/coach-dashboard";
import {StudentDashboardPage} from "../pages/student-dashboard/student-dashboard";


@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    RoleChoicePage,
    CoachDashboardPage,
    StudentDashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    RoleChoicePage,
    CoachDashboardPage,
    StudentDashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {
}
