import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import firebase from 'firebase';

@Injectable()
export class TaskService {
  nodeName: string = '/tasks/';

  constructor(private authService: AuthService) {
  }

  /**
   * Create a new task
   *
   * @param task
   * @returns {firebase.database.ThenableReference}
   */
  createTask(task) {
    return firebase.database().ref(this.nodeName).push(task);
  }

  /**
   * Get all tasks that were created by me for a specific student
   *
   * @param sid
   * @returns {firebase.database.Query}
   */
  getAllTasksFromMeToStudent(sid: string) {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref(this.nodeName).orderByChild('from_to').equalTo(uid + '_' + sid);
  }

  /**
   * Get all tasks meant for me, from a specific coach
   *
   * @param cid
   * @returns {firebase.database.Query}
   */
  getAllTasksForMeFromCoach(cid: string) {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref(this.nodeName).orderByChild('from_to').equalTo(cid + '_' + uid);
  }

  /**
   * Get a task by its ID
   *
   * @param taskId
   * @returns {firebase.database.Reference}
   */
  getTaskWithId(taskId: string) {
    return firebase.database().ref(this.nodeName).child(taskId);
  }

  /**
   * Delete a task by its ID
   *
   * @param taskId
   * @returns {firebase.Promise<any>}
   */
  deleteTaskById(taskId: string) {
    return firebase.database().ref(this.nodeName).child(taskId).remove();
  }

  /**
   * Update a task by its ID
   *
   * @param taskId
   * @param updateObj
   * @returns {firebase.Promise<any>}
   */
  updateTaskById(taskId: string, updateObj: object) {
    return firebase.database().ref(this.nodeName).child(taskId).update(updateObj);
  }
}
