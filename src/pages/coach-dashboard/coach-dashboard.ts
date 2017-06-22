import {Component, OnInit} from '@angular/core';
import {
  IonicPage, PopoverController, AlertController, NavController, ActionSheetController,
  Events
} from 'ionic-angular';
import {DashboardPopoverPage} from "../dashboard-popover/dashboard-popover";
import {CoachTaskPage} from "../coach-task/coach-task";
import {StudentService} from "../../services/student.service";
import {InviteService} from "../../services/invite.service";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../models/notification.model";
import {NotificationPage} from "../notification/notification";
import {TaskTemplatesPage} from "../task-templates/task-templates";
import {SettingsPage} from "../settings/settings";

@IonicPage()
@Component({
  selector: 'page-coach-dashboard',
  templateUrl: 'coach-dashboard.html',
})
export class CoachDashboardPage implements OnInit {
  private searchIsActive: boolean = false;
  private searchQuery: string = '';
  private students: any[] = [];
  private notifications: Notification[] = [];

  constructor(private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private studentService: StudentService,
              private inviteService: InviteService,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private events: Events,
              private notificationService: NotificationService) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadStudents();
    this.subscribeStudents();

    this.loadUnreadNotifications();
    this.subscribeUnreadNotifications();
  }

  /**
   * Load initial students from service
   */
  private loadStudents() {
    this.students = this.studentService.getStudents();
  }

  /**
   * Subscribe to students and listen for changes
   */
  private subscribeStudents() {
    //Listen for changes
    this.events.subscribe('students:changed', students => {
      this.students = students;
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
   * Open task page with tasks for student
   *
   * @param i
   */
  goToTasks(i: number) {
    if (this.searchIsActive) return;

    let sid = this.students[i]._id;

    this.navCtrl.push(CoachTaskPage, {
      sid: sid
    });
  }

  /**
   * Open notifications page
   */
  goToNotifications() {
    this.navCtrl.push(NotificationPage);
  }

  /**
   * Open action sheet for editing or deleting a student
   *
   * @param i [The index of the student in the students array]
   */
  openActionSheet(i: number) {
    if (this.searchIsActive) return;

    let pid = this.students[i].pairingId;

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
   * @param i [The index of the student in the students array]
   */
  showConfirm(pid: string) {
    let confirm = this.alertCtrl.create({
      title: 'Schüler löschen',
      message: 'Möchtest du den Schüler wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            this.studentService.deleteStudent(pid);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Show student invite prompt
   */
  showPrompt() {
    if (this.searchIsActive) return;

    let prompt = this.alertCtrl.create({
      title: 'Student einladen',
      message: "Anfrage senden, um Schüler hinzuzufügen",
      inputs: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'E-Mail'
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Senden',
          handler: data => {
            this.inviteService.sendInviteToStudent(data.email);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Present popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DashboardPopoverPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if (data) {
        if (data.page === 'task-templates') {
          this.navCtrl.push(TaskTemplatesPage);
        }
        else if (data.page === 'settings') {
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
      this.loadStudents();
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
    this.loadStudents();

    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.students = this.students.filter((student) => {
        return student.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
      });
    }
  }
}
