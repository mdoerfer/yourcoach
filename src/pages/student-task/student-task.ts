import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-student-task',
  templateUrl: 'student-task.html',
})
export class StudentTaskPage implements OnInit {
  taskchange: string = "open";

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    console.log(this.navParams.data);
}

}
