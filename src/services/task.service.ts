import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import firebase from 'firebase';
import {Events} from "ionic-angular";
import {NotificationService} from "./notification.service";
import {Notification} from "../models/notification.model";

@Injectable()
export class TaskService {
  nodeName: string = '/tasks/';

  tasks: any[] = []; //Tasks for me from coach
  assignments: any[] = []; //Tasks from me to student

  constructor(private authService: AuthService,
              private events: Events,
              private notificationService: NotificationService) {
    this.observeAssignments();
    this.observeTasks();
  }

  /**
   * Get all tasks that were created by me for a specific student
   *
   * @param sid Student ID
   * @returns {any[]}
   */
  getAssignments(sid: string) {
    return this.assignments.filter((assignment) => {
      return assignment.to === sid;
    });
  }

  /**
   * Get all drafts that were created by me
   *
   * @returns {any[]}
   */
  getDrafts() {
    return this.assignments.filter((assignment) => {
      return assignment.draft === true;
    });
  }

  /**
   * Observe all tasks that were created by me
   */
  observeAssignments() {
    let uid = this.authService.getActiveUser().uid;

    let query = firebase.database()
      .ref(this.nodeName)
      .orderByChild('from')
      .equalTo(uid);

    query.on('value', snapshot => {
      let dbAssignments = snapshot.val();
      let assignments = [];

      //Add tasks to matching arrays, depending on their state
      for (let assignmentId in dbAssignments) {
        let assignment = dbAssignments[assignmentId];
        assignment._id = assignmentId;

        assignments.push(assignment);
      }

      //Update state
      this.assignments = assignments;
      this.events.publish('tasks:assignments-changed');
    })
  }

  /**
   * Get all tasks meant for me, from a specific coach
   *
   * @param cid Coach ID
   * @returns {any[]}
   */
  getTasks(cid: string) {
    return this.tasks.filter((task) => {
      return task.from === cid;
    });
  }

  /**
   * Observe all tasks meant for me
   */
  observeTasks() {
    let uid = this.authService.getActiveUser().uid;

    let query = firebase.database()
      .ref(this.nodeName)
      .orderByChild('to')
      .equalTo(uid);

    query.on('value', snapshot => {
      let dbTasks = snapshot.val();
      let tasks = [];

      //Add tasks to matching arrays, depending on their state
      for (let taskId in dbTasks) {
        let task = dbTasks[taskId];
        task._id = taskId;

        tasks.push(task);
      }

      //Update state
      this.tasks = tasks;
      this.events.publish('tasks:tasks-changed');
    });
  }

  /**
   * Get task id for new task
   */
  getNewTaskID() {
    return firebase.database().ref(this.nodeName).push().key;
  }

  /**
   * Create a new task
   *
   * @param task
   * @returns {firebase.database.ThenableReference}
   */
  createTask(id, task) {
    return firebase.database()
      .ref(this.nodeName + '/' + id)
      .update(task)
      .then(data => {
        this.events.publish('tasks:create-success', {
          message: 'Die Aufgabe wurde erstellt.'
        });

        this.notificationService.createNotification(new Notification()
          .setType('task:new')
          .setDescription(task.title)
          .setTo(task.to)
          .setAdditionalInfo({
            cid: task.from
          }));
      }, error => {
        this.events.publish('tasks:create-failed', {
          message: error.message
        });
      });
  }

  /**
   * Get a task by its ID
   *
   * @param taskId
   * @returns {firebase.database.Reference}
   */
  getTaskWithId(taskId: string) {
    return firebase.database()
      .ref(this.nodeName)
      .child(taskId);
  }

  /**
   * Update a task by its ID
   *
   * @param taskId
   * @param updateObj
   * @returns {firebase.Promise<any>}
   */
  updateTaskById(taskId: string, updateObj: object) {
    return firebase.database()
      .ref(this.nodeName)
      .child(taskId)
      .update(updateObj)
      .then(data => {
        this.events.publish('tasks:update-success', {
          message: 'Die Aufgabe wurde aktualisiert'
        });
      }, error => {
        this.events.publish('tasks:update-failed', {
          message: error.message
        });
      });
  }

  /**
   * Delete a task by its ID
   *
   * @param taskId
   * @returns {firebase.Promise<any>}
   */
  deleteTaskById(taskId: string) {
    return firebase.database()
      .ref(this.nodeName)
      .child(taskId)
      .remove()
      .then(data => {
        this.events.publish('tasks:delete-success', {
          message: 'Die Aufgabe wurde gelöscht'
        });
      }, error => {
        this.events.publish('tasks:delete-failed', {
          message: error.message
        });
      });
  }

  markTaskAsGradeable(task: any) {
    this.updateTaskById(task._id, {
      state: 'grade'
    }).then(data => {
      this.events.publish('tasks:done-success', {
        message: 'Die Aufgabe wurde erledigt.'
      });

      this.notificationService.createNotification(new Notification()
        .setType('task:done')
        .setDescription(task.title)
        .setTo(task.from)
        .setAdditionalInfo({
          sid: task.to
        }));
    }, error => {
      this.events.publish('tasks:done-failed', {
        message: error.message
      });
    });
  }

  /**
   * Rate assignment and mark it as done
   *
   * @param assignment
   */
  rateAssignmentAndMarkAsDone(assignment: any) {
    this.updateTaskById(assignment._id, {
      state: 'done',
      rating: assignment.rating
    }).then(data => {
      this.events.publish('tasks:grade-success', {
        message: 'Die Aufgabe wurde bewertet.'
      });

      this.notificationService.createNotification(new Notification()
        .setType('task:graded')
        .setDescription(assignment.title)
        .setTo(assignment.to)
        .setAdditionalInfo({
          cid: assignment.from
        }));
    }, error => {
      this.events.publish('tasks:grade-failed', {
        message: error.message
      });
    });
  }
}
