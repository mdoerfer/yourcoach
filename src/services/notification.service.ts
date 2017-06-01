import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Events} from "ionic-angular";
import {Notification} from "../models/notification.model";

@Injectable()
export class NotificationService {
  nodeName: string = '/notifications/';

  notifications: Notification[] = [];

  constructor(private authService: AuthService,
              private events: Events) {
    this.observeNotifications();
  }

  /**
   * Get notifications
   */
  getNotifications() {
    return this.notifications.slice();
  }

  /**
   * Get unread notifications
   */
  getUnreadNotifications() {
    return this.notifications.filter((notification) => {
      return notification.getRead() === false;
    })
  }

  /**
   * Observe notifications
   */
  observeNotifications() {
    let uid = this.authService.getActiveUser().uid;

    firebase.database()
      .ref(this.nodeName)
      .orderByChild('to')
      .equalTo(uid)
      .on('value', snapshot => {
        let dbNotifications = snapshot.val();
        let notifications = [];

        for (let notificationId in dbNotifications) {
          let dbNotification = dbNotifications[notificationId];
          let notification = new Notification();

          notification
            .load(dbNotification)
            .setId(notificationId);

          notifications.push(notification);
        }

        //Sort notifications
        notifications.sort((n1, n2) => {
          //Newest notification first
          return n2.getCreatedAt() - n1.getCreatedAt();
        });

        //Update state
        this.notifications = notifications;
        this.events.publish('notifications:changed', this.notifications);
      });
  }

  /**
   * Get single notification
   */
  getNotification(nid: string) {
    firebase.database()
      .ref(this.nodeName)
      .child(nid);
  }

  /**
   * Create notification
   */
  createNotification(notification: Notification) {
    firebase.database()
      .ref(this.nodeName)
      .push(notification)
      .then(data => {
        this.events.publish('notifications:create-success', {
          message: 'Die Benachrichtigung wurde erstellt.'
        });
      }, error => {
        this.events.publish('notifications:create-failed', {
          message: error.message
        });
      });
  }

  /**
   * Update notification
   */
  updateNotification(nid: string, updateData: object) {
    firebase.database()
      .ref(this.nodeName)
      .child(nid)
      .update(updateData)
      .then(data => {
        this.events.publish('notifications:update-success', {
          message: 'Die Benachrichtigung wurde aktualisiert.'
        });
      }, error => {
        this.events.publish('notifications:update-failed', {
          message: error.message
        });
      });
  }

  /**
   * Delete notification
   */
  deleteNotification(nid: string) {
    firebase.database()
      .ref(this.nodeName)
      .child(nid)
      .remove()
      .then(data => {
        this.events.publish('notifications:delete-success', {
          message: 'Die Benachrichtigung wurde gelöscht.'
        });
      }, error => {
        this.events.publish('notifications:delete-failed', {
          message: error.message
        });
      });
  }

  /**
   * Mark notification as read
   *
   * @param nid Notification ID
   */
  markNotificationAsRead(nid: string) {
    this.updateNotification(nid, {
      read: true
    });
  }
}
