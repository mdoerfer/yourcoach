import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
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
              private actionSheetCtrl: ActionSheetController,
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
      let dbTasks = tasks.val();
      let openTasksArr = [];
      let gradeTasksArr = [];
      let doneTasksArr = [];

      for (let taskId in dbTasks) {
        this.taskService.getTaskWithId(taskId).once('value', task => {
          let newTask = task.val();
          newTask._id = taskId;

          if(newTask.state == 'open') {
            openTasksArr.push(newTask);
          }
          else if(newTask.state == 'grade') {
            gradeTasksArr.push(newTask);
          }
          else if(newTask.state == 'done') {
            doneTasksArr.push(newTask);
          }
        });
      }

      this.openTasks = openTasksArr;
      this.gradeTasks = gradeTasksArr;
      this.doneTasks = doneTasksArr;
    });
  }

  /**
   * Change the task rating and mark it as done
   *
   * @param task
   * @param state
   */
  rateTaskAndMarkAsDone(task: any) {
    this.taskService.updateTaskById(task._id, {
      state: 'done',
      rating: task.rating
    });
  }

  /**
   * Open create task page
   */
  goToCreateTask() {
    this.navCtrl.push(CreateTaskPage, {
      sid: this.sid
    });
  }

  /**
   * Open edit task page for given task id
   *
   * @param tid Task ID
   */
  goToEditTask(tid) {
    this.navCtrl.push(CreateTaskPage, {
      mode: 'edit',
      tid: tid
    });
  }

  /**
   * Open action sheet
   *
   * @param tid Task ID
   */
  openActionSheet(tid) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            console.log('Task löschen');
          }
        }, {
          text: 'Bearbeiten',
          handler: () => {
            this.goToEditTask(tid);
          }
        }, {
          text: 'Abbrechen',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
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

