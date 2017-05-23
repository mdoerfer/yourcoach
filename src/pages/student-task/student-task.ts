import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, PopoverController} from 'ionic-angular';
import {TaskPopoverPage} from "../task-popover/task-popover";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-student-task',
  templateUrl: 'student-task.html',
})
export class StudentTaskPage implements OnInit {
  activeTab: string = "open";
  cid: string;
  user: object;

  openTasks: any[] = [];
  gradeTasks: any[] = [];
  doneTasks: any[] = [];

  constructor(private navParams: NavParams,
              private popoverCtrl: PopoverController,
              private taskService: TaskService,
              private userService: UserService) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.cid = this.navParams.get('cid');

    this.initializeCoach();
    this.initializeTasks();
  }

  /**
   * Load the currently active coach data
   */
  private initializeCoach() {
    this.userService.getUserRefById(this.cid).once('value', user => {
      this.user = user.val();
    });
  }

  /**
   * Read coaches from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeTasks() {
    this.taskService.getAllTasksForMeFromCoach(this.cid).on('value', tasks => {
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
