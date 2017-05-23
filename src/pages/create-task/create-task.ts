import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage implements OnInit {
  taskForm: FormGroup;
  difficulties: string[];
  responses: string[];
  sid: string;

  constructor(private navParams: NavParams,
              private taskService: TaskService) {
  }

  ngOnInit() {
    this.sid = this.navParams.get('sid');
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
      'Sprachnachricht',
      'Auswahlmöglichkeit...'
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
    let task = this.taskForm.value;

    this.taskService.createTask(task);
  }
}
