import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {Events} from "ionic-angular";
import {NotificationService} from "./notification.service";
import {Notification} from "../models/notification.model";

@Injectable()
export class InviteService {
  nodeName: string = '/invites/';
  usersNodeName: string = '/users/';
  pairingsNodeName: string = '/pairings/';

  invites: any[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private events: Events,
              private notificationService: NotificationService) {
    this.observeInvites();
  }

  /**
   * Get invites
   */
  getInvites() {
    return this.invites.slice();
  }

  /**
   * Observe all coaches from student
   */
  observeInvites() {
    let uid = this.authService.getActiveUser().uid;

    let query = firebase.database().ref(this.nodeName).orderByChild('student').equalTo(uid);

    query.on('value', snapshot => {
      let dbInvites = snapshot.val();
      let invites: any[] = [];

      for (let inviteId in dbInvites) {
        let invite = dbInvites[inviteId];

        //Identify coach and add to array
        this.userService.getUserRefById(invite.coach).once('value', user => {
          let newCoach = user.val();
          newCoach._id = invite.coach;
          newCoach.inviteId = inviteId;

          invites.push(newCoach);
        });
      }

      //Update state
      this.invites = invites;
      this.events.publish('invites:changed', this.invites);
    });
  }

  /**
   * Remove invite by invite id
   *
   * @param iid
   */
  removeInviteById(iid: string) {
    return firebase.database()
      .ref(this.nodeName + iid)
      .remove()
      .then(data => {
        this.events.publish('invites:remove-success', {
          message: 'Die Einladung wurde entfernt'
        });
      }, error => {
        this.events.publish('invites:remove-failed', {
          message: error.message
        });
      });
  }

  /**
   * Decline invite by id
   *
   * @param iid ID of the invite
   * @param cid ID of the coach
   * @returns {firebase.Promise<any>}
   */
  declineInviteById(iid: string, cid: string) {
    return firebase.database()
      .ref(this.nodeName + iid)
      .remove()
      .then(data => {
        this.events.publish('invites:decline-success', {
          message: 'Die Einladung wurde abgelehnt'
        });

        this.notificationService.createNotification(new Notification()
          .setType('invite:decline')
          .setDescription('Klicke hier um sie anzusehen.')
          .setTo(cid));
      }, error => {
        this.events.publish('invites:decline-failed', {
          message: error.message
        });
      });
  }

  /**
   * Accept invite by id
   *
   * @param iid ID of the invite
   * @param cid ID of the coach
   * @returns {firebase.Promise<any>}
   */
  acceptInviteById(iid: string, cid: string) {
    let uid = this.authService.getActiveUser().uid;

    let promise = firebase.database()
      .ref(this.pairingsNodeName)
      .push({
        coach: cid,
        student: uid,
        coach_student: cid + '_' + uid,
        created_at: new Date().valueOf(),
        updated_at: new Date().valueOf(),
        deleted: false
      });

    promise
      .then(data => {
        this.removeInviteById(iid);

        this.events.publish('invites:accept-success', {
          message: 'Einladung angenommen.'
        });

        this.notificationService.createNotification(new Notification()
          .setType('invite:accept')
          .setDescription('Deine Einladung wurde angenommen.')
          .setTo(cid));
      }, error => {
        this.events.publish('invites:accept-failed', {
          message: error.message
        });
      });

    return promise;
  }

  /**
   * Send an invite to a student
   *
   * @param email
   * @returns {firebase.Promise<any>}
   */
  sendInviteToStudent(email: string) {
    let uid = this.authService.getActiveUser().uid;

    //Find students
    firebase.database().ref(this.usersNodeName)
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', snapshot => {
        //Student ID
        let sid = snapshot.key;

        //Check if student/coach is already paired
        firebase.database()
          .ref(this.pairingsNodeName)
          .orderByChild('coach_student')
          .equalTo(uid + '_' + sid)
          .once('value', snapshot => {
            if (!snapshot.hasChild('created_at')) {

              //Add invite to invites node to sid, if not trying to invite myself
              if (sid != uid) {
                return firebase.database()
                  .ref(this.nodeName)
                  .push({
                    coach: uid,
                    student: sid,
                    coach_student: uid + '_' + sid,
                    created_at: new Date().valueOf()
                  });
              }
            }
          })
          .then(data => {
            this.events.publish('invites:send-success', {
              message: 'Die Einladung wurde erfolgreich verschickt'
            });

            console.log(data);
            console.log(data.val());

            this.notificationService.createNotification(new Notification()
              .setType('invite:new')
              .setDescription('Klicke hier um sie anzusehen.')
              .setTo(sid));
          }, error => {
            this.events.publish('invites:send-failed', {
              message: error.message
            });
          });
      });
  }
}
