import {Component, OnInit} from '@angular/core';
import {IonicPage, PopoverController, AlertController, NavController} from 'ionic-angular';
import {MorePopoverPage} from "./more-popover/more-popover";
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

  ngOnInit(){
    this.initializeStudents();
  }

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

  goToTasks(i: number) {
    let sid = this.students[i]._id;

    this.navCtrl.push(CoachTaskPage, {
      sid: sid
    });

  }

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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MorePopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
