import firebase from 'firebase';
import {Injectable} from "@angular/core";

import {AuthService} from "./auth.service";

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {
  }

  /**
   * Sets the user node in the firebase database to the passed object
   * and overrides any properties that might have existed prior to calling
   * the method.
   *
   * @param ref
   * @returns {firebase.Promise<any>}
   */
  setActiveUserRef(ref: object) {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('users/' + uid).set(ref);
  }

  /**
   * Updates the user node in the firebase database with the provided object
   * and doesn't override any properties except existing ones
   *
   * @param ref
   * @returns {firebase.Promise<any>}
   */
  updateActiveUserRef(ref: object) {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('users/' + uid).update(ref);
  }

  /**
   * Returns the promise containing the user node
   *
   * @returns {firebase.Promise<any>}
   */
  getActiveUserRef() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/users/' + uid);
  }

  /**
   * Returns the corresponding user
   *
   * @param id
   * @returns {firebase.database.Reference}
   */
  getUserRefById(id: string) {
    return firebase.database().ref('/users/' + id);
  }

  /**
   * Get all invites from coaches
   *
   * @returns {firebase.Promise<any>}
   */
  getInvites() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/users/' + uid + '/invites');
  }

  /**
   * Remove invite by coach id
   *
   * @param cid
   */
  removeInviteById(cid: string) {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/users/' + uid + '/invites/' + cid).remove();
  }

  /**
   * Accept invite by id
   *
   * @param cid
   */
  acceptInviteById(cid: string) {
    let uid = this.authService.getActiveUser().uid;

    //Add coach to student
    firebase.database().ref('/users/' + uid + '/coaches/' + cid).set({
      created_at: new Date().valueOf()
    });

    //Add student to coach
    firebase.database().ref('/users/' + cid + '/students/' + uid).set({
      created_at: new Date().valueOf()
    });

    //Remove invite
    this.removeInviteById(cid);
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

      //TODO: Check if student/coach were already paired, if yes dont create invite

      //Add invite to invites node to sid
      return firebase.database().ref('/users/' + sid + '/invites/' + uid).update({
        created_at: new Date().valueOf()
      });
    });
  }
}
