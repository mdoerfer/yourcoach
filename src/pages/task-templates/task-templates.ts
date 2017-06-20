import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, Events, IonicPage, NavController, AlertController, NavParams,
  ModalController
} from 'ionic-angular';
import {TaskService} from "../../services/task.service";
import {CreateTaskPage} from "../create-task/create-task";
import {CoachSendTaskModalPage} from "../coach-send-task-modal/coach-send-task-modal";
import {StudentTaskTextModalPage} from "../student-task-text-modal/student-task-text-modal";

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

  showModal(){
    let sendModal = this.modalCtrl.create(CoachSendTaskModalPage);
    sendModal.present();
  }

}
