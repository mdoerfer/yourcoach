import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Events, IonicPage, NavController, PopoverController} from 'ionic-angular';
import {StudentTaskPage} from "../student-task/student-task";
import {InviteService} from "../../services/invite.service";
import {CoachService} from "../../services/coach.service";
import {AlertController} from 'ionic-angular';
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/notification.model";
import {NotificationPage} from "../notification/notification";
import {DashboardStudentPopoverPage} from "../dashboard-student-popover/dashboard-student-popover";
import {UserService} from "../../services/user.service";
import {TaskService} from "../../services/task.service";
import {SettingsPage} from "../settings/settings";


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  private searchIsActive: boolean = false;
  private searchQuery: string = '';
  private coaches: any[] = [];
  private pendingInvites: any[] = [];
  private notifications: Notification[] = [];


  tasks: any[] = [];

  constructor(private inviteService: InviteService,
              private coachService: CoachService,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private events: Events,
              private userService: UserService,
              private taskService: TaskService,
              private notificationService: NotificationService) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadInvites();
    this.subscribeInvites();

    this.loadCoaches();
    this.subscribeCoaches();

    this.subscribeTasks();

    this.loadUnreadNotifications();
    this.subscribeUnreadNotifications();

  }


  /**
   * Load initial coaches from service
   */
  private loadCoaches() {
    this.coaches = this.coachService.getCoaches();

    this.countOpenTaskAmount();
  }

  /**
   * Subscribe to coaches and listen for changes
   */
  private subscribeCoaches() {
    //Listen for changes
    this.events.subscribe('coaches:changed', () => {
      this.loadCoaches();
    })
  }

  private subscribeTasks() {
    //Listen for task changes
    this.events.subscribe('tasks:tasks-changed', () => {
      this.countOpenTaskAmount();
    })
  }

  private countOpenTaskAmount() {
    for(let i = 0; i < this.coaches.length; i++) {
      this.taskService.getOpenTasks(this.coaches[i]._id)
        .then(amount => {
          this.coaches[i].openTasks = amount;
        }, error => {
          console.error(error.message);
        });
    }
  }

  /**
   * Load initial invites from service
   */
  private loadInvites() {
    this.pendingInvites = this.inviteService.getInvites();
  }


  /**
   * Subscribe to invites and listen for changes
   */
  private subscribeInvites() {
    //Listen for changes
    this.events.subscribe('invites:changed', invites => {
      this.pendingInvites = invites;
    })
  }

  /**
   * Load initial notifications
   */
  private loadUnreadNotifications() {
    this.notifications = this.notificationService.getUnreadNotifications();
  }

  /**
   * Subscribe to notifications and listen for changes
   */
  private subscribeUnreadNotifications() {
    this.events.subscribe('notifications:changed', () => {
      this.loadUnreadNotifications();
    })
  }

  /**
   * Accept invite
   *
   * @param i Index of the invite in the array
   */
  onAcceptInvite(i: number) {
    if (this.searchIsActive) return;

    let iid = this.pendingInvites[i].inviteId;
    let cid = this.pendingInvites[i]._id;

    this.inviteService.acceptInviteById(iid, cid);
  }

  /**
   * Decline invite
   *
   * @param i Index of the invite in the array
   */
  onDeclineInvite(i: number) {
    if (this.searchIsActive) return;

    let iid = this.pendingInvites[i].inviteId;
    let cid = this.pendingInvites[i]._id;

    this.inviteService.declineInviteById(iid, cid);
  }

  /**
   * Open task page with tasks from coach
   *
   * @param i
   */
  goToTasks(i: number) {
    if (this.searchIsActive) return;

    let cid = this.coaches[i]._id;
    this.navCtrl.push(StudentTaskPage, {
      cid: cid
    });
  }

  /**
   * Open notifications page
   */
  goToNotifications() {
    this.navCtrl.push(NotificationPage);
  }

  /**
   * Open action sheet for editing or deleting a coach
   *
   * @param i [The index of the coach in the coaches array]
   */
  openActionSheet(i: number) {
    let pid = this.coaches[i].pairingId;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.showConfirm(pid);
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
   * Open alert for backup
   *
   * @param i [The index of the coach in the coaches array]
   */

  showConfirm(pid: string) {
    let confirm = this.alertCtrl.create({
      title: 'Coach löschen',
      message: 'Möchtest du den Coach wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.coachService.deleteCoach(pid);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Present popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DashboardStudentPopoverPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        if (data.page === 'settings') {
          this.navCtrl.push(SettingsPage);
        }
      }
    });
  }

  /**
   * Toggle search
   */
  toggleSearch() {
    if (this.searchIsActive) {
      this.searchIsActive = false;
      this.loadCoaches();
    }
    else {
      this.searchIsActive = true;
    }
  }

  /**
   * Close search if it is active
   */
  checkSearch() {
    if (this.searchIsActive) {
      this.toggleSearch();
    }
  }

  /**
   * Filter students
   */
  search() {
    this.loadCoaches();

    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.coaches = this.coaches.filter((coach) => {
        return coach.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
      });
    }
  }

  /**
   * Get tasks by state
   */
  getTasksByState(state: string) {
    return this.tasks.filter((task) => {
      return task.state === state;
    });
  }

}
