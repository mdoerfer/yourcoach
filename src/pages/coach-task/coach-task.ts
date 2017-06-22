import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, Events, IonicPage, NavController, NavParams,
  PopoverController
} from 'ionic-angular';
import {CreateTaskPage} from "../create-task/create-task";
import {TaskPopoverPage} from "../task-popover/task-popover";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";
import {TaskChatPage} from "../task-chat/task-chat";
import {WatchMediaModalPage} from "../watch-media-modal/watch-media-modal";
import {StatisticsPage} from "../statistics/statistics";
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-coach-task',
  templateUrl: 'coach-task.html',
})
export class CoachTaskPage implements OnInit {
  activeTab: string = "open";
  sid: string;
  user: object;
  tab: string;

  assignments: any[] = [];
  openAssignments: any[] = [];
  gradeAssignments: any[] = [];
  doneAssignments: any[] = [];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private taskService: TaskService,
              private userService: UserService,
              private events: Events) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.sid = this.navParams.get('sid');
    this.tab = this.navParams.get('tab') || null;

    if(this.tab) {
      this.activeTab = this.tab;
    }

    this.loadStudent();

    this.loadAssignments();
    this.subscribeAssignments();
  }

  /**
   * Load the currently active student data
   */
  private loadStudent() {
    this.userService.getUserRefById(this.sid).once('value', user => {
      this.user = user.val();
    });
  }

  /**
   * Load initial tasks
   */
  private loadAssignments() {
    this.assignments = this.taskService.getAssignments(this.sid);

    this.openAssignments = this.getAssignmentsByState('open');
    this.gradeAssignments = this.getAssignmentsByState('grade');
    this.doneAssignments = this.getAssignmentsByState('done');
  }

  /**
   * Subscribe to tasks and listen for changes
   */
  private subscribeAssignments() {
    this.events.subscribe('tasks:assignments-changed', () => {
      this.loadAssignments();
    });
  }

  /**
   * Get tasks by state
   */
  getAssignmentsByState(state: string) {
    return this.assignments.filter((assignment) => {
      return assignment.state === state;
    });
  }

  /**
   * Change the task rating and mark it as done
   *
   * @param assignment
   * @param state
   */
  rateAssignmentAndMarkAsDone(assignment: any) {
    this.taskService.rateAssignmentAndMarkAsDone(assignment);
  }

  /**
   * Open create task page
   */
  goToCreateTask() {
    this.navCtrl.push(CreateTaskPage, {
      sid: this.sid
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
   * @param mediaType
   * @param attachment
   */
  watchAttachment(attachment: any) {
    this.navCtrl.push(WatchMediaModalPage, {
      media: attachment
    });
  }

  /**
   * Watch response
   *
   * @param mediaType
   * @param response
   */
  watchResponse(response: any) {
    this.navCtrl.push(WatchMediaModalPage, {
      media: response
    });
  }

  /**
   * Show the popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage, {
      user: this.user,
      doneTasks: this.doneAssignments
    });
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if(data) {
        if(data.page === 'statistic') {
          this.navCtrl.push(StatisticsPage, {
            doneTasks: data.doneTasks
          });
        }
        else if(data.page === 'profile') {
          this.navCtrl.push(ProfilePage, {
            user: data.user
          });
        }
      }
    });
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

