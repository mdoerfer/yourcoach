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
              private events: Events) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.cid = this.navParams.get('cid');
    this.tab = this.navParams.get('tab') || null;

    if(this.tab) {
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
   * @param tId
   */
  private openChat(task: any) {
    this.navCtrl.push(TaskChatPage, {task: task});
    console.log(task);

  }

}
