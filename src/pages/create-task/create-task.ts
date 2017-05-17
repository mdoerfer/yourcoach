import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  taskForm: FormGroup;
  difficulties: string[];
  responses: string[];

  constructor() {
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
    console.log(this.taskForm.value);
  }
}
