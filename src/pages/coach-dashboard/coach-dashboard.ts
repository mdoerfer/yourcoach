import {Component, OnInit} from '@angular/core';
import {IonicPage, PopoverController, AlertController, NavController, ActionSheetController} from 'ionic-angular';
import {DashboardPopoverPage} from "../dashboard-popover/dashboard-popover";
import {UserService} from "../../services/user.service";
import {CoachTaskPage} from "../coach-task/coach-task";
import {StudentService} from "../../services/student.service";
import {InviteService} from "../../services/invite.service";

@IonicPage()
@Component({
  selector: 'page-coach-dashboard',
  templateUrl: 'coach-dashboard.html',
})
export class CoachDashboardPage implements OnInit {
  private students: any[] = [];

  constructor(private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private userService: UserService,
              private studentService: StudentService,
              private inviteService: InviteService,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.initializeStudents();
  }

  /**
   * Read students from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeStudents() {
    this.studentService.getStudents().on('value', pairings => {
      let dbPairings = pairings.val();
      let studentsArr: any[] = [];

      for (let pairingId in dbPairings) {
        let pairing = dbPairings[pairingId];

        this.userService.getUserRefById(pairing.student).once('value', user => {
          let newStudent = user.val();
          newStudent._id = pairing.student;
          newStudent.pairingId = pairingId;

          if (!pairing.deleted) {
            studentsArr.push(newStudent);
          }
        })
      }

      this.students = studentsArr;
    });
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
   * Open alert for backup
   *
   * @param i [The index of the student in the students array]
   */

  showConfirm(pid: string) {
    let confirm = this.alertCtrl.create({
      title: 'Schüler löschen',
      message: 'Möchtest du den Schüler wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Löschen',
          handler: () => {
            this.studentService.deleteStudent(pid);
          }
        }
      ]
    });
    confirm.present();
  }

  /**
   * Open action sheet for editing or deleting a student
   *
   * @param i [The index of the student in the students array]
   */
  openActionSheet(i: number) {
    let pid = this.students[i].pairingId;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.showConfirm(pid);
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
            this.inviteService.sendInviteToStudent(data.email);
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
