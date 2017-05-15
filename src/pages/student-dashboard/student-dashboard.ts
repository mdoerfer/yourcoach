import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  students = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getInvites();
  }
}
