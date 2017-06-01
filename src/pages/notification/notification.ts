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

  ngOnInit() {
    this.loadNotifications();
    this.subscribeNotifications();
  }

  private loadNotifications() {
    this.notifications = this.notificationService.getNotifications();
  }

  private subscribeNotifications() {
    this.events.subscribe('notifications:changed', notifications => {
      this.notifications = notifications;
    });
  }

}
