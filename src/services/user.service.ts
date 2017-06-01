import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Events} from "ionic-angular";

@Injectable()
export class UserService {
  nodeName: string = '/users/';

  constructor(private authService: AuthService,
              private events: Events) {
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

    return firebase.database().ref(this.nodeName + uid).update(ref);
  }

  /**
   * Returns the promise containing the user node
   *
   * @returns {firebase.Promise<any>}
   */
  getActiveUserRef() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref(this.nodeName + uid);
  }

  /**
   * Returns the corresponding user
   *
   * @param id
   * @returns {firebase.database.Reference}
   */
  getUserRefById(uid: string) {
    return firebase.database().ref(this.nodeName + uid);
  }

  /**
   * Delete user
   */
  deleteUser() {
    this.updateActiveUserRef({
      deleted: "true"
    })
      .then(data => {
        this.events.publish('user:delete-success', {
          message: 'Nutzer wurde erfolgreich gelöscht.'
        });
      })
      .catch(error => {
        this.events.publish('user:delete-failed', {
          message: error.message
        });
      });
  }

}

