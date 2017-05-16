import {Task} from "../models/task.model";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import firebase from 'firebase';

@Injectable()
export class TaskService {
  constructor(private authService: AuthService) {
  }

  /**
   * Create a new task
   *
   * @param task
   * @returns {firebase.database.ThenableReference}
   */
  createTask(task: Task) {
    return firebase.database().ref('/tasks/').push(task);
  }

  /**
   * Get all tasks that were created by me
   *
   * @returns {firebase.database.Query}
   */
  getAllTasksFromMe() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/tasks/').orderByChild('from').equalTo(uid);
  }

  /**
   * Get all tasks that are meant for me
   *
   * @returns {firebase.database.Query}
   */
  getAllTasksForMe() {
    let uid = this.authService.getActiveUser().uid;

    return firebase.database().ref('/tasks/').orderByChild('to').equalTo(uid);
  }

  /**
   * Get a task by its ID
   *
   * @param taskId
   * @returns {firebase.database.Reference}
   */
  getTaskWithId(taskId: string) {
    return firebase.database().ref('/tasks/').child(taskId);
  }

  /**
   * Delete a task by its ID
   *
   * @param taskId
   * @returns {firebase.Promise<any>}
   */
  deleteTaskById(taskId: string) {
    return firebase.database().ref('/tasks/').child(taskId).remove();
  }

  /**
   * Update a task by its ID
   *
   * @param taskId
   * @param updateObj
   * @returns {firebase.Promise<any>}
   */
  updateTaskById(taskId: string, updateObj: object) {
    return firebase.database().ref('/tasks/').child(taskId).update(updateObj);
  }

  /**
   * Rate a task via ID
   *
   * @param taskId
   * @param rating
   */
  rateTask(taskId: string, rating: string) {
    this.updateTaskById(taskId, {
      rating: rating
    });
  }

  /**
   * Change a task state via ID
   *
   * @param taskId
   * @param state
   */
  changeState(taskId: string, state: string) {
    this.updateTaskById(taskId, {
      state: state
    })
  }


}
