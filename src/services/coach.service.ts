import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class CoachService {
  constructor(private authService: AuthService) {
  }

  /**
   * Get all coaches from student
   *
   * @returns {firebase.Promise<any>}
   */
  getCoaches() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/pairings/').orderByChild('student').equalTo(uid);
  }

  /**
   * Delete coach from student
   *
   * @param pid Pairing ID
   */
  deleteCoach(pid: string) {
    firebase.database().ref('/pairings/' + pid).update({
      deleted: true
    });
  }
}
