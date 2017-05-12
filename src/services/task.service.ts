import {Task} from "../models/task.model";
import {AuthService} from "./auth.service";

export class TaskService {
  constructor(private authService: AuthService) {
  }

  createTask(task: Task) {
    firebase.database().ref('tasks/').set(task);
  }

  getAllTasksFromMe() {
    return firebase.database().ref('tasks/').once('value');
  }

  getTaskWithId(taskId: string) {

  }

  getAllTasksForMe() {

  }

  deleteTask(taskId: number) {

  }

  editTask(taskId: number) {

  }

  rateTask(taskId: number, rate: string) {


  }

  changeState(taskID: number, state: string) {

  }


}
