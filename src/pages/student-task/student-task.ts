import {Component, OnInit} from '@angular/core';
import {
  Events, IonicPage, ModalController, NavController, NavParams, PopoverController,
  ToastController
} from 'ionic-angular';
import {TaskPopoverPage} from "../task-popover/task-popover";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";
import {StudentTaskTextModalPage} from "../student-task-text-modal/student-task-text-modal";
import {TaskChatPage} from "../task-chat/task-chat";
import {StudentTaskVideoModalPage} from "../student-task-video-modal/student-task-video-modal";
import {StudentTaskImageModalPage} from "../student-task-image-modal/student-task-image-modal";
import {StudentTaskVoiceModalPage} from "../student-task-voice-modal/student-task-voice-modal";
import {FileService} from "../../services/file.service";

@IonicPage()
@Component({
  selector: 'page-student-task',
  templateUrl: 'student-task.html',
})
export class StudentTaskPage implements OnInit {
  activeTab: string = "open";
  cid: string;
  user: object;
  tab: string;

  tasks: any[] = [];
  openTasks: any[] = [];
  gradeTasks: any[] = [];
  doneTasks: any[] = [];

  constructor(private navParams: NavParams,
              private popoverCtrl: PopoverController,
              private taskService: TaskService,
              private userService: UserService,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private events: Events,
              private fileService: FileService) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.cid = this.navParams.get('cid');
    this.tab = this.navParams.get('tab') || null;

    if (this.tab) {
      this.activeTab = this.tab;
    }

    this.loadCoach();

    this.loadTasks();
    this.subscribeTasks();
  }

  /**
   * Load the currently active coach data
   */
  private loadCoach() {
    this.userService.getUserRefById(this.cid).once('value', user => {
      this.user = user.val();
    });
  }

  /**
   * Load initial tasks
   */
  private loadTasks() {
    this.tasks = this.taskService.getTasks(this.cid);

    this.openTasks = this.getTasksByState('open');
    this.gradeTasks = this.getTasksByState('grade');
    this.doneTasks = this.getTasksByState('done');
  }

  /**
   * Subscribe to tasks and listen for changes
   */
  private subscribeTasks() {
    this.events.subscribe('tasks:tasks-changed', () => {
      this.loadTasks();
    });
  }

  /**
   * Get tasks by state
   */
  getTasksByState(state: string) {
    return this.tasks.filter((task) => {
      return task.state === state;
    });
  }

  /**
   * Change the task state
   *
   * @param task
   */
  markTaskAsGradeable(task: any) {
    this.taskService.markTaskAsGradeable(task);
  }

  /**
   * Open the task card
   *
   * @param task
   */
  toggle(task: any) {
    task.open = !task.open;
  }

  /**
   * Watch attachment
   *
   * @param attachment
   */
  watchAttachment(attachment: any) {
    console.log(attachment);
  }

  /**
   * Show the popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage, {
      user: this.user,
      doneTasks: this.doneTasks
    });
    popover.present({
      ev: myEvent
    });
  }

  /**
   * Check if task needs a response
   *
   * @param task
   */
  checkIfResponseWanted(task: any) {
    switch (task.responseType) {
      case "Keine":
        this.markTaskAsGradeable(task);
        break;
      case "Text":
        this.showModalText(task);
        break;
      case "Video":
        this.showModalVideo(task);
        break;
      case "Bild":
        this.showModalImage(task);
        break;
      case "Sprachnachricht":
        this.showModalVoice(task);
        break;
      default:
        this.markTaskAsGradeable(task);
    }
  }

  /**
   * Shows modal for text response
   *
   * @param task
   */
  showModalText(task: any) {
    let textModal = this.modalCtrl.create(StudentTaskTextModalPage, {task: task});
    textModal.present();
    textModal.onDidDismiss(data => {
      if (data) {
        this.taskService.updateTaskById(task._id, {
          response: data
        })
          .then(data => {
            this.showToast("Rückmeldung wurde versendet.");
            this.markTaskAsGradeable(task);
          })
          .catch(error => {
            this.showToast(error.message);
          });
      }
    });
  }

  /**
   * Shows modal for video response
   *
   * @param task
   */
  showModalVideo(task: any) {
    let videoModal = this.modalCtrl.create(StudentTaskVideoModalPage, {task: task});
    videoModal.present();
    videoModal.onDidDismiss(data => {
      if (data) {
        this.fileService.uploadFileToStorage(data.url, task._id, 'response');
        this.markTaskAsGradeable(task);
      }
    });
  }

  /**
   * Shows modal for image response
   *
   * @param task
   */
  showModalImage(task: any) {
    let imageModal = this.modalCtrl.create(StudentTaskImageModalPage, {task: task});
    imageModal.present();
    imageModal.onDidDismiss(data => {
      if (data) {
        this.fileService.uploadFileToStorage(data.url, task._id, 'response');
        this.markTaskAsGradeable(task);
      }
    });
  }

  /**
   * Shows modal for voice response
   *
   * @param task
   */
  showModalVoice(task: any) {
    let voiceModal = this.modalCtrl.create(StudentTaskVoiceModalPage, {task: task});
    voiceModal.present();
    voiceModal.onDidDismiss(data => {
      if (data) {
        this.fileService.uploadFileToStorage(data.url, task._id, 'response');
        this.markTaskAsGradeable(task);
      }
    });
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

  /**
   * Open Task Chat
   *
   * @param task
   */
  private openChat(task: any) {
    this.navCtrl.push(TaskChatPage, {task: task});

  }

}
