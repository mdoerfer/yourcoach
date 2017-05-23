import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
              private navCtrl: NavController,
              private authService: AuthService,
              private taskService: TaskService,
              private toastCtrl: ToastController) {
  }

  /**
   * Initialize the page
   */
  ngOnInit() {
    this.initializeForm();
  }

  /**
   * Initialize the form
   */
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
      response: new FormControl(this.responses[0], null),
      responseInstructions: new FormControl(null, null)
    });
  }

  /**
   * Create a new task
   * and save it in the database
   */
  onCreateTask() {
    this.taskService.createTask({
      from: this.authService.getActiveUser().uid,
      to: this.navParams.get('sid'),
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      difficulty: this.taskForm.get('difficulty').value,
      response: this.taskForm.get('response').value,
      responseInstructions: this.taskForm.get('responseInstructions').value
    })
      .then(data => {
        this.showToast("Aufgabe wurde erfolgreich gesendet.");

        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error.message);
      })
  }

  /**
   * Shows a short toast message
   *
   * @param msg
   * @param duration
   */
  private showToast(msg: string, duration: number = 3000) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }
}
