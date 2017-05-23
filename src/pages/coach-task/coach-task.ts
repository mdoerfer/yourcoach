import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {CreateTaskPage} from "../create-task/create-task";
import {TaskPopoverPage} from "../task-popover/task-popover";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-coach-task',
  templateUrl: 'coach-task.html',
})
export class CoachTaskPage implements OnInit {
  createTaskPage = CreateTaskPage;
  activeTab: string = "open";
  sid: string;
  user: object;

  openTasks: any[] = [];
  gradeTasks: any[] = [];
  doneTasks: any[] = [];

  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private taskService: TaskService,
              private userService: UserService) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.sid = this.navParams.get('sid');

    this.initializeStudent();
    this.initializeTasks();
  }

  /**
   * Load the currently active student data
   */
  private initializeStudent() {
    this.userService.getUserRefById(this.sid).once('value', user => {
      this.user = user.val();
    });
  }

  /**
   * Read students from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeTasks() {
    this.taskService.getAllTasksFromMeToStudent(this.sid).on('value', tasks => {
      this.openTasks = [];
      this.gradeTasks = [];
      this.doneTasks = [];

      for (let taskId in tasks.val()) {
        this.taskService.getTaskWithId(taskId).once('value', task => {
          let newTask = task.val();
          newTask._id = taskId;

          if(newTask.state == 'open') {
            this.openTasks.push(newTask);
          }
          else if(newTask.state == 'grade') {
            this.gradeTasks.push(newTask);
          }
          else if(newTask.state == 'done') {
            this.doneTasks.push(newTask);
          }
        });
      }
    });
  }

  /**
   * Open task page with tasks for student
   *
   * @param i
   */
  goToCreateTask() {
    this.navCtrl.push(CreateTaskPage, {
      sid: this.sid
    });
  }

  /**
   * Open the task card
   *
   * @param task
   */
  toggle(task: any) {
    task.open = !task.open;
  }

  /**
   * Show the popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}

