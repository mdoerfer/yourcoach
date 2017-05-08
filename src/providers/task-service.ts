import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { IonicStorageModule } from '@ionic/storage';



import {Task} from "../models/task.model";

/*
  Generated class for the TaskService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskService {

  constructor(public http: Http) {
    console.log('Hello TaskService Provider');

  }



  getTasks(): Observable<Task[]> {
    return this.http
      .get('assets/task.json')
      .delay(0)
      .map((res: Response) => res.json());
  }

  getTasksId(id): Observable<Task> {
    return this.http
      .get('assets/task.json')
      .map((res: Response) => res.json())
      .map((tasks: Task[]) => {
        for (let task of tasks) {
          if (task.id === id) {
            return task;
          }
        }
      });
  }



}
