import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import {FileService} from "../../services/file.service";

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

  existingAttachments = {
    images: [],
    videos: [],
    voice: []
  };

  newAttachments = {
    images: [],
    videos: [],
    voice: []
  };

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private authService: AuthService,
              private taskService: TaskService,
              private toastCtrl: ToastController,
              private camera: Camera,
              private mediaCapture: MediaCapture,
              private fileService: FileService,
              private actionSheetCtrl: ActionSheetController) {
    this.tid = this.navParams.get('tid') || null;
    this.mode = this.navParams.get('mode') || 'create';

    this.cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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
    if (this.tid !== null) {
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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Anhang hochladen/erstellen',
      buttons: [
        {
          text: 'Bild',
          handler: () => {
            this.addPicture();
          }
        },{
          text: 'Video',
          handler: () => {
            this.addVideo();
          }
        },{
          text: 'Sprachnachricht',
          handler: () => {
            this.addVoice();
          }
        }, {
          text: 'Abbrechen',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Add picture
   */
  addPicture() {
    this.mediaCapture.captureImage()
      .then(
        (data: MediaFile[]) => {
          for (var i = 0; i < data.length; i++) {
            this.newAttachments.images.push(data[i].fullPath);
          }
        }, (err: CaptureError) => {
          console.error(err)
        }
      );
  }

  /**
   * Add video
   */
  addVideo() {
    this.mediaCapture.captureVideo()
      .then(
        (data: MediaFile[]) => {
          for (var i = 0; i < data.length; i++) {
            this.newAttachments.videos.push(data[i].fullPath);
          }
        }, (err: CaptureError) => {
          console.error(err)
        }
      );
  }

  /**
   * Add video
   */
  addVoice() {
    this.mediaCapture.captureAudio()
      .then(
        (data: MediaFile[]) => {
          for (var i = 0; i < data.length; i++) {
            this.newAttachments.voice.push(data[i].fullPath);
          }
        }, (err: CaptureError) => {
          console.error(err)
        }
      );
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
    }).then(data => {
      //TODO: Remove attachments

      //Upload new images
      for (let i = 0; i < this.newAttachments.images.length; i++) {
        this.fileService.uploadFileToStorage(this.newAttachments.images[i], this.tid, 'image');
      }

      //Upload new videos
      for (let i = 0; i < this.newAttachments.videos.length; i++) {
        this.fileService.uploadFileToStorage(this.newAttachments.videos[i], this.tid, 'video');
      }

      //Upload new voice records
      for (let i = 0; i < this.newAttachments.voice.length; i++) {
        this.fileService.uploadFileToStorage(this.newAttachments.voice[i], this.tid, 'voice');
      }

      this.showToast("Aufgabe wurde erfolgreich bearbeitet.");

      this.navCtrl.pop();
    })
      .catch(error => {
        this.showToast(error.message);
      });
  }

  /**
   * Create a new draft task
   * and save it in the datababase
   */
  onDraftTask() {
    let newTaskID = this.taskService.getNewTaskID();

    this.taskService.createTask(newTaskID, {
      from: this.authService.getActiveUser().uid,
      to: null,
      from_to: null,
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      difficulty: this.taskForm.get('difficulty').value,
      responseType: this.taskForm.get('responseType').value,
      responseInstructions: this.taskForm.get('responseInstructions').value,
      created_at: new Date().valueOf(),
      updated_at: new Date().valueOf(),
      draft: true,
      attachments: {
        images: {},
        videos: {},
        voice: {}
      }
    })
      .then(data => {
        //Upload new images
        for (let i = 0; i < this.newAttachments.images.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.images[i], newTaskID, 'image');
        }

        //Upload new videos
        for (let i = 0; i < this.newAttachments.videos.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.videos[i], newTaskID, 'video');
        }

        //Upload new voice records
        for (let i = 0; i < this.newAttachments.voice.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.voice[i], newTaskID, 'voice');
        }

        this.showToast("Aufgabe wurde erfolgreich erstellt.");

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
    let newTaskID = this.taskService.getNewTaskID();

    this.taskService.createTask(newTaskID, {
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
      draft: false,
      attachments: {
        images: {},
        videos: {},
        voice: {}
      }
    })
      .then(data => {
        //Upload new images
        for (let i = 0; i < this.newAttachments.images.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.images[i], newTaskID, 'image');
        }

        //Upload new videos
        for (let i = 0; i < this.newAttachments.videos.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.videos[i], newTaskID, 'video');
        }

        //Upload new voice records
        for (let i = 0; i < this.newAttachments.voice.length; i++) {
          this.fileService.uploadFileToStorage(this.newAttachments.voice[i], newTaskID, 'voice');
        }

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
    switch (this.mode) {
      case 'edit':
        this.onEditTask();
        break;
      case 'draft':
        this.onDraftTask();
        break;
      default:
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
