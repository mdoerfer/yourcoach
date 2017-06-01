import {Component, OnInit} from '@angular/core';
import {Events, IonicPage} from 'ionic-angular';
import {Notification} from "../../models/notification.model";
import {NotificationService} from "../../services/notification.service";

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage implements OnInit {
  private notifications : Notification[] = [];

  constructor(private notificationService: NotificationService,
              private events: Events) {

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

    console.log(notification);
    console.log('Go to target page');
  }

}
