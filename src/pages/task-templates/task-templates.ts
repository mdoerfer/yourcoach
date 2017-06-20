import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, Events, IonicPage, NavController, AlertController, NavParams,
  ModalController, ToastController
} from 'ionic-angular';
import {TaskService} from "../../services/task.service";
import {CreateTaskPage} from "../create-task/create-task";
import {CoachSendTaskModalPage} from "../coach-send-task-modal/coach-send-task-modal";
import {StudentTaskTextModalPage} from "../student-task-text-modal/student-task-text-modal";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-task-templates',
  templateUrl: 'task-templates.html',
})
export class TaskTemplatesPage implements OnInit {

  draftAssignments: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private taskService: TaskService,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private authService: AuthService,
              private toastCtrl: ToastController,
              private events: Events) {

  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadDrafts();
    this.subscribeAssignments();

  }

  /**
   * Load initial tasks
   */
  private loadDrafts() {
    this.draftAssignments = this.taskService.getDrafts();
  }

  /**
   * Subscribe to tasks and listen for changes
   */
  private subscribeAssignments() {
    this.events.subscribe('tasks:assignments-changed', () => {
      this.loadDrafts();
    });
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
   * Open action sheet
   *
   * @param tid Task ID
   */
  openActionSheet(tid) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.showConfirm(tid);
          }
        }, {
          text: 'Bearbeiten',
          handler: () => {
            this.goToEditTask(tid);
          }
        }, {
          text: 'Abbrechen',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Open create task page
   */
  goToCreateDraftTask() {
    this.navCtrl.push(CreateTaskPage, {
      mode: 'draft'
    });
  }

  /**
   * Open edit task page for given task id
   *
   * @param tid Task ID
   */
  goToEditTask(tid) {
    this.navCtrl.push(CreateTaskPage, {
      mode: 'edit',
      tid: tid
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
   * Confirm task deletion
   *
   * @param tid Task ID
   */

  showConfirm(tid: string) {
    let confirm = this.alertCtrl.create({
      title: 'Task löschen',
      message: 'Möchtest du den Task wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.taskService.deleteTaskById(tid);
          }
        }
      ]
    });
    confirm.present();
  }

  showModal(i: string){
    let sendModal = this.modalCtrl.create(CoachSendTaskModalPage);
    sendModal.present();
    sendModal.onDidDismiss(data => {
      if (data) {
        let task = this.draftAssignments[i];

        let newTaskID = this.taskService.getNewTaskID();

        this.taskService.createTask(newTaskID, {
          from: this.authService.getActiveUser().uid,
          to: data._id,
          from_to: this.authService.getActiveUser().uid + '_' + data._id,
          title: task.title || null,
          description: task.description || null,
          difficulty: task.difficulty,
          rating: 0,
          responseType: task.responseType,
          responseInstructions: task.responseInstructions || null,
          state: 'open',
          created_at: new Date().valueOf(),
          updated_at: new Date().valueOf(),
          draft: false,
        })
          .then(data => {
            this.showToast("Aufgabe wurde erfolgreich gesendet.");

            this.navCtrl.pop();
          })
          .catch(error => {
            this.showToast(error.message);
          });
      }
    });
  }

}
