import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Events} from "ionic-angular";
import {UserService} from "./user.service";
import {TaskService} from "./task.service";

@Injectable()
export class CoachService {
  nodeName: string = '/pairings/';

  coaches: any[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private taskService: TaskService,
              private events: Events) {
    this.observeCoaches();
  }

  /**
   * Get coaches
   */
  getCoaches() {
    return this.coaches.slice();
  }

  /**
   * Observe all coaches from student
   */
  observeCoaches() {
    let uid = this.authService.getActiveUser().uid;

    let query = firebase.database()
      .ref(this.nodeName)
      .orderByChild('student')
      .equalTo(uid);

    query.on('value', snapshot => {
      let dbPairings = snapshot.val();
      let coaches: any[] = [];
      
      console.log('OBSERVING COACHES FIRED');

      for (let pairingId in dbPairings) {
        let pairing = dbPairings[pairingId];

        this.userService.getUserRefById(pairing.coach).once('value', user => {
          let newCoach = user.val();

          newCoach._id = pairing.coach;
          newCoach.pairingId = pairingId;

          if (!pairing.deleted && !newCoach.deleted) {
            coaches.push(newCoach);
          }
        })
      }

      //Update state
      this.coaches = coaches;
      this.events.publish('coaches:changed', this.coaches);
    });
  }

  /**
   * Delete coach from student
   *
   * @param pid Pairing ID
   */
  deleteCoach(pid: string) {
    firebase.database().ref(this.nodeName + pid).remove().then(data => {
      this.events.publish('coaches:delete-success', {
        message: 'Coach wurde gelöscht'
      });
    }, error => {
      this.events.publish('coaches:delete-failed', {
        message: error.message
      });
    });
  }
}
