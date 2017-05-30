import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {
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
}
