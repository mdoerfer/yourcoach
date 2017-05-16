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
import {MorePopoverPage} from "../pages/coach-dashboard/more-popover/more-popover";
import {TaskService} from "../services/task.service";
import {UserService} from "../services/user.service";
import {CoachTaskPage} from "../pages/coach-task/coach-task";
import {CreateTaskPage} from "../pages/create-task/create-task";
import {StudentTaskPage} from "../pages/student-task/student-task";


@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    RoleChoicePage,
    CoachDashboardPage,
    StudentDashboardPage,
    MorePopoverPage,
    CoachTaskPage,
    CreateTaskPage,
    StudentTaskPage
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
    StudentDashboardPage,
    MorePopoverPage,
    CoachTaskPage,
    CreateTaskPage,
    StudentTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    TaskService
  ]
})
export class AppModule {
}
