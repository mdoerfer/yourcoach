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
  mode: string;
  tid: string;
  taskForm: FormGroup;
  difficulties: string[];
  responses: string[];
  states: object[];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private authService: AuthService,
              private taskService: TaskService,
              private toastCtrl: ToastController) {
    this.tid = this.navParams.get('tid') || null;
    this.mode = this.navParams.get('mode') || 'create';
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

    this.states = [
      {
        label: 'Offen',
        value: 'open'
      },
      {
        label: 'Zu bewerten',
        value: 'grade'
      },
      {
        label: 'Abgeschlossen',
        value: 'done'
      }
    ];

    let formData = {
      title: null,
      description: null,
      difficulty: this.difficulties[1],
      response: this.responses[0],
      responseInstructions: null,
      state: 'open',
      rating: 0
    };

    //Prefill form with task data if we're in edit mode
    if(this.tid !== null) {
      this.taskService.getTaskWithId(this.tid).once('value', snapshot => {
        let task = snapshot.val();

        formData.title = task.title;
        formData.description = task.description;
        formData.difficulty = task.difficulty;
        formData.response = task.response;
        formData.responseInstructions = task.responseInstructions;
        formData.state = task.state;
        formData.rating = task.rating || 0;
      });
    }

    //Create form
    this.taskForm = new FormGroup({
      title: new FormControl(formData.title, Validators.required),
      description: new FormControl(formData.description, Validators.required),
      difficulty: new FormControl(formData.difficulty, Validators.required),
      response: new FormControl(formData.response, null),
      responseInstructions: new FormControl(formData.responseInstructions, null),
      state: new FormControl(formData.state, null),
      rating: new FormControl(formData.rating, null)
    });
  }

  /**
   * Edit task
   * and update it in the database
   */
  onEditTask() {
    this.taskService.updateTaskById(this.tid, {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      difficulty: this.taskForm.get('difficulty').value,
      response: this.taskForm.get('response').value,
      responseInstructions: this.taskForm.get('responseInstructions').value,
      state: this.taskForm.get('state').value,
      rating: this.taskForm.get('rating').value,
      updated_at: new Date().valueOf()
    }).then(data => {
      this.showToast("Aufgabe wurde erfolgreich bearbeitet.");

      this.navCtrl.pop();
    })
      .catch(error => {
        this.showToast(error.message);
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
      from_to: this.authService.getActiveUser().uid + '_' + this.navParams.get('sid'),
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      difficulty: this.taskForm.get('difficulty').value,
      rating: 0,
      response: this.taskForm.get('response').value,
      responseInstructions: this.taskForm.get('responseInstructions').value,
      state: 'open',
      created_at: new Date().valueOf(),
      updated_at: new Date().valueOf()
    })
      .then(data => {
        this.showToast("Aufgabe wurde erfolgreich gesendet.");

        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error.message);
      });
  }

  submitForm() {
    if(this.mode === 'edit') {
      this.onEditTask();
    }
    else {
      this.onCreateTask();
    }
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
