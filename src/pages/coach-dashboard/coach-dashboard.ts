import {Component, OnInit} from '@angular/core';
import {IonicPage, PopoverController, AlertController, NavController} from 'ionic-angular';
import {DashboardPopoverPage} from "../dashboard-popover/dashboard-popover";
import {UserService} from "../../services/user.service";
import {CoachTaskPage} from "../coach-task/coach-task";

@IonicPage()
@Component({
  selector: 'page-coach-dashboard',
  templateUrl: 'coach-dashboard.html',
})
export class CoachDashboardPage implements OnInit{
  private students: any[] = [];
  constructor(private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private userService: UserService, private navCtrl: NavController) {
  }

  /**
   * Initialize component
   */
  ngOnInit(){
    this.initializeStudents();
  }

  /**
   * Read students from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeStudents() {
    this.userService.getStudents().on('value', students => {
      this.students = [];

      for (let studentId in students.val()) {
        this.userService.getUserRefById(studentId).once('value', user => {
          let newStudent = user.val();
          newStudent._id = studentId;

          this.students.push(newStudent);
        })
      }
    })
  }

  /**
   * Open task page with tasks for student
   *
   * @param i
   */
  goToTasks(i: number) {
    let sid = this.students[i]._id;

    this.navCtrl.push(CoachTaskPage, {
      sid: sid
    });
  }

  /**
   * Show student invite prompt
   */
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Student einladen',
      message: "Anfrage senden, um Schüler hinzuzufügen",
      inputs: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'E-Mail'
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Senden',
          handler: data => {
            this.userService.sendInviteToStudent(data.email);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Present popover at event location
   *
   * @param myEvent
   */
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DashboardPopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
