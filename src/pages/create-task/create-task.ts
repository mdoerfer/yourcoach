import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage implements OnInit {
  taskForm: FormGroup;
  difficulties: string[];
  responses: string[];

  constructor(private navParams: NavParams,
              private authService: AuthService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    //Schwierigkeitsstufen
    this.difficulties = [
      'Einfach',
      'Mittel',
      'Schwer'
    ];

    //Rückmeldungsarten
    this.responses = [
      'Keine',
      'Text',
      'Bild',
      'Video',
      'Sprachnachricht'
    ];

    //Create form
    this.taskForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      difficulty: new FormControl(this.difficulties[1], Validators.required),
      response: new FormControl(this.responses[0], null)
    })
  }

  onCreateTask() {
    this.taskService.createTask({
      from: this.authService.getActiveUser().uid,
      to: this.navParams.get('sid'),
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      difficulty: this.taskForm.get('difficulty').value,
      response: this.taskForm.get('response').value,
    });
  }
}
