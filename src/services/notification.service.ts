import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class NotificationService {
  nodeName: string = '/notifications/';

  constructor(private authService: AuthService) {

  }

  /**
   * Get notifications
   */
  getNotifications() {
    let uid = this.authService.getActiveUser().uid;

    firebase.database().ref(this.nodeName).orderByChild('to').equalTo(uid).on('value', notifications => {
      let dbNotifications = notifications.val();
    });
  }

  /**
   * Read notification
   *
   * @param nid Notification ID
   */
  readNotification(nid: string) {
    firebase.database().ref(this.nodeName + nid).update({
      read: true
    });
  }
}
