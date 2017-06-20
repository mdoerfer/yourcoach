import {Component, OnInit} from '@angular/core';
import {Events, NavParams, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'page-coach-send-task-modal',
  templateUrl: 'coach-send-task-modal.html',
})
export class CoachSendTaskModalPage implements OnInit{

  private students: any[] = [];

  constructor(public viewCtrl: ViewController,
              private studentService: StudentService,
              private events: Events,
              private navParams: NavParams) {


  }

  /**
   * Initialize the page
   */
  ngOnInit() {
    this.loadStudents();
    this.subscribeStudents();
  }

  /**
   * Load initial students from service
   */
  private loadStudents() {
    this.students = this.studentService.getStudents();
  }

  /**
   * Subscribe to students and listen for changes
   */
  private subscribeStudents() {
    //Listen for changes
    this.events.subscribe('students:changed', students => {
      this.students = students;
    })
  }

  /**
   * Closes text modal
   */
  dismissModal(){
    this.viewCtrl.dismiss();
  }

  /**
   * Closes modal with data and sends tasks to chosen student
   */
  sendTaskToStudent(i){
    this.viewCtrl.dismiss(this.students[i]);
  }


}
