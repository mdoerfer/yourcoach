import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, PopoverController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {StudentTaskPage} from "../student-task/student-task";
import {DashboardPopoverPage} from "../dashboard-popover/dashboard-popover";


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  private coaches: any[] = [];
  private pendingInvites: any[] = [];

  constructor(private userService: UserService,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private actionSheetCtrl: ActionSheetController) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.initializePendingInvites();
    this.initializeCoaches();
  }

  /**
   * Accept invite
   *
   * @param i
   */
  onAcceptInvite(i: number) {
    let cid = this.pendingInvites[i]._id;

    this.userService.acceptInviteById(cid);
  }

  /**
   * Decline invite
   *
   * @param i
   */
  onDeclineInvite(i: number) {
    let cid = this.pendingInvites[i]._id;

    this.userService.removeInviteById(cid);
  }

  /**
   * Open task page with tasks from coach
   *
   * @param i
   */
  goToTasks(i: number) {
    let cid = this.coaches[i]._id;
    this.navCtrl.push(StudentTaskPage, {
      cid: cid
    });
  }

  openCoachAlert(i: number) {
    let cid = this.coaches[i]._id;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.userService.deleteCoach(cid);
          }
        }, {
          text: 'Bearbeiten',
          handler: () => {
            console.log('Coach bearbeiten');
          }
        }, {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            console.log('Abbrechen');
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Read coaches from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeCoaches() {
    this.userService.getCoaches().on('value', coaches => {
      let dbCoaches = coaches.val();
      let coachesArr: any[] = [];

      for (let coachId in dbCoaches) {
        let coach = dbCoaches[coachId];

        this.userService.getUserRefById(coachId).once('value', user => {
          let newCoach = user.val();
          newCoach._id = coachId;

          if(!coach.deleted) {
            coachesArr.push(newCoach);
          }
        })
      }

      this.coaches = coachesArr;
    })
  }

  /**
   * Get pending invites and the related coaches
   * Automatically update on changes to the database
   */
  private initializePendingInvites() {
    //Get pending invites
    this.userService.getInvites().on('value', invites => {
      let dbInvites = invites.val();
      let invitesArr: any[] = [];

      for (let coachId in dbInvites) {
        //let invite = dbInvites[coachId];

        //Identify coach and add to array
        this.userService.getUserRefById(coachId).once('value', user => {
          let newCoach = user.val();
          newCoach._id = coachId;

          invitesArr.push(newCoach);
        })
      }

      this.pendingInvites = invitesArr;
    });
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
