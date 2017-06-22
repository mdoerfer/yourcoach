import {Component, OnInit} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {Notification} from "../../models/notification.model";
import {NotificationService} from "../../services/notification.service";
import {StudentTaskPage} from "../student-task/student-task";
import {CoachTaskPage} from "../coach-task/coach-task";
import {StudentDashboardPage} from "../student-dashboard/student-dashboard";
import {CoachDashboardPage} from "../coach-dashboard/coach-dashboard";
import {TaskChatPage} from "../task-chat/task-chat";

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage implements OnInit {
  private notifications: Notification[] = [];

  constructor(private notificationService: NotificationService,
              private events: Events,
              private navCtrl: NavController) {

  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadNotifications();
    this.subscribeNotifications();
  }

  /**
   * Load initial notifications
   */
  private loadNotifications() {
    this.notifications = this.notificationService.getNotifications();
  }

  /**
   * Subscribe to notification changes
   */
  private subscribeNotifications() {
    this.events.subscribe('notifications:changed', notifications => {
      this.notifications = notifications;
    });
  }

  /**
   * Visit target page of notifications
   *
   * @param notification
   */
  goToTargetPage(notification: Notification) {
    this.notificationService.markNotificationAsRead(notification.getId());

    switch(notification.getType()) {
      case 'task:new':
        this.navCtrl.push(StudentTaskPage, {
          cid: notification.getAdditionalInfo('cid'),
          tab: 'open'
        });
        break;
      case 'task:graded':
        this.navCtrl.push(StudentTaskPage, {
          cid: notification.getAdditionalInfo('cid'),
          tab: 'done'
        });
        break;
      case 'task:done':
        this.navCtrl.push(CoachTaskPage, {
          sid: notification.getAdditionalInfo('sid'),
          tab: 'grade'
        });
        break;
      case 'chat:new-message':
        this.navCtrl.push(TaskChatPage, {
          task: notification.getAdditionalInfo('task')
        });
        break;
      case 'reminder':
        this.navCtrl.push(StudentTaskPage, {
          cid: notification.getAdditionalInfo('cid'),
          tab: 'done'
        });
        break;
      case 'invite:new':
        this.navCtrl.push(StudentDashboardPage);
        break;
      case 'invite:accept':
        this.navCtrl.push(CoachDashboardPage);
        break;
      case 'invite:decline':
        this.navCtrl.push(CoachDashboardPage);
        break;
    }
  }

}
