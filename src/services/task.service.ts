import {Task} from "../models/task.model";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class TaskService {
  constructor(private authService: AuthService) {
  }

  createTask(task: Task) {

  }

  getAllTasksFromMe() {

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
