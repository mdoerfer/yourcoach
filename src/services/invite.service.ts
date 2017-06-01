import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {Events} from "ionic-angular";

@Injectable()
export class InviteService {
  nodeName: string = '/invites/';
  usersNodeName: string = '/users/';
  pairingsNodeName: string = '/pairings/';

  invites: any[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private events: Events) {
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
    return firebase.database().ref(this.nodeName + iid).remove();
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
          }, error => {
            this.events.publish('invites:send-failed', {
              message: error.message
            });
          });
      });
  }
}
