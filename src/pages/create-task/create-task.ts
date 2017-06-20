import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";
import {Camera,CameraOptions} from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage implements OnInit {
  mode: string;
  tid: string;
  cameraOptions: CameraOptions;
  taskForm: FormGroup;
  difficulties: string[];
  responses: string[];
  states: object[];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private authService: AuthService,
              private taskService: TaskService,
              private toastCtrl: ToastController,
              private camera: Camera) {
    this.tid = this.navParams.get('tid') || null;
    this.mode = this.navParams.get('mode') || 'create';

    this.cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.ALLMEDIA
    };
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
      responseType: this.responses[0],
      responseInstructions: null,
      state: 'open',
      rating: 0,
      draft: false
    };

    //Prefill form with task data if we're in edit mode
    if(this.tid !== null) {
      this.taskService.getTaskWithId(this.tid).once('value', snapshot => {
        let task = snapshot.val();

        formData.title = task.title;
        formData.description = task.description;
        formData.difficulty = task.difficulty;
        formData.responseType = task.responseType;
        formData.responseInstructions = task.responseInstructions;
        formData.state = task.state;
        formData.rating = task.rating || 0;
        formData.draft = task.draft;
      });
    }

    //Create form
    this.taskForm = new FormGroup({
      title: new FormControl(formData.title, Validators.required),
      description: new FormControl(formData.description, Validators.required),
      difficulty: new FormControl(formData.difficulty, Validators.required),
      responseType: new FormControl(formData.responseType, null),
      responseInstructions: new FormControl(formData.responseInstructions, null),
      state: new FormControl(formData.state, null),
      rating: new FormControl(formData.rating, null),
      draft: new FormControl(formData.draft, null)
    });
  }

  /**
   * Add attachment
   */
  addAttachment() {

    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      alert('Image added');

      console.log(imageData);
      console.log(base64Image);
    }, (err) => {
      // Handle error
      console.error(err);
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
      responseType: this.taskForm.get('responseType').value,
      responseInstructions: this.taskForm.get('responseInstructions').value,
      state: this.taskForm.get('state').value,
      rating: this.taskForm.get('rating').value,
      updated_at: new Date().valueOf(),
      draft: this.taskForm.get('draft').value
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
      responseType: this.taskForm.get('responseType').value,
      responseInstructions: this.taskForm.get('responseInstructions').value,
      state: 'open',
      created_at: new Date().valueOf(),
      updated_at: new Date().valueOf(),
      draft: this.taskForm.get('draft').value
    })
      .then(data => {
        this.showToast("Aufgabe wurde erfolgreich gesendet.");

        this.navCtrl.pop();
      })
      .catch(error => {
        this.showToast(error.message);
      });
  }

  /**
   * checks if task is created or edited
   */
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
