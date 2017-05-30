import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class InviteService {
  constructor(private authService: AuthService) {
  }

  /**
   * Get all invites from coaches
   *
   * @returns {firebase.database.Query}
   */
  getInvites() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/invites/').orderByChild('student').equalTo(uid);
  }

  /**
   * Remove invite by invite id
   *
   * @param iid
   */
  removeInviteById(iid: string) {
    return firebase.database().ref('/invites/' + iid).remove();
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

    let promise = firebase.database().ref('/pairings/').push({
      coach: cid,
      student: uid,
      coach_student: cid + '_' + uid,
      created_at: new Date().valueOf(),
      updated_at: new Date().valueOf(),
      deleted: false
    });

    promise.then(data => {
      this.removeInviteById(iid);
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
    firebase.database().ref('/users').orderByChild('email').equalTo(email).once('child_added', snapshot => {
      //Student ID
      let sid = snapshot.key;

      //Check if student/coach is already paired
      firebase.database().ref('/pairings/').orderByChild('coach_student').equalTo(uid + '_' + sid).once('value', snapshot => {
        if(!snapshot.hasChild('created_at')) {

          //Add invite to invites node to sid, if not trying to invite myself
          if(sid != uid) {
            return firebase.database().ref('/invites/').push({
              coach: uid,
              student: sid,
              coach_student: uid + '_' + sid,
              created_at: new Date().valueOf()
            });
          }
        }
      });
    });
  }
}
