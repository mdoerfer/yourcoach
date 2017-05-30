import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class StudentService {
  nodeName: string = '/pairings/';

  constructor(private authService: AuthService) {
  }

  /**
   * Get all students from coaches
   *
   * @returns {firebase.Promise<any>}
   */
  getStudents() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref(this.nodeName).orderByChild('coach').equalTo(uid);
  }

  /**
   * Delete student from coach
   *
   * @param pid Pairing ID
   */
  deleteStudent(pid: string) {
    firebase.database().ref(this.nodeName + pid).update({
      deleted: true
    });
  }
}
