import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {Events} from "ionic-angular";

@Injectable()
export class StudentService {
  nodeName: string = '/pairings/';

  students: any[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private events: Events) {
    this.observeStudents();
  }

  /**
   * Get all students
   */
  getStudents() {
    return this.students.slice();
  }

  /**
   * Observe all students from coaches
   */
  observeStudents() {
    let uid = this.authService.getActiveUser().uid;

    let query = firebase.database()
      .ref(this.nodeName)
      .orderByChild('coach')
      .equalTo(uid);

    query.on('value', snapshot => {
      let dbPairings = snapshot.val();
      let students: any[] = [];

      for (let pairingId in dbPairings) {
        let pairing = dbPairings[pairingId];

        this.userService.getUserRefById(pairing.student).once('value', user => {
          let newStudent = user.val();

          newStudent._id = pairing.student;
          newStudent.pairingId = pairingId;

          if (!pairing.deleted && !newStudent.deleted) {
            students.push(newStudent);
          }
        })
      }

      //Update state
      this.students = students;
      this.events.publish('students:changed', this.students);
    })
  }

  /**
   * Delete student from coach
   *
   * @param pid Pairing ID
   */
  deleteStudent(pid: string) {
    firebase.database().ref(this.nodeName + pid).update({
      deleted: true
    }).then(data => {
      this.events.publish('students:delete-success', {
        message: 'Student wurde gelöscht'
      });
    }, error => {
      this.events.publish('students:delete-failed', {
        message: error.message
      });
    });
  }
}
