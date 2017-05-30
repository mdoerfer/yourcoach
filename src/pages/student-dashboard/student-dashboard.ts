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
   * @param i Index of the invite in the array
   */
  onAcceptInvite(i: number) {
    let iid = this.pendingInvites[i].inviteId;
    let cid = this.pendingInvites[i]._id;

    this.userService.acceptInviteById(iid, cid);
  }

  /**
   * Decline invite
   *
   * @param i Index of the invite in the array
   */
  onDeclineInvite(i: number) {
    let iid = this.pendingInvites[i].inviteId;

    this.userService.removeInviteById(iid);
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

  /**
   * Open action sheet for editing or deleting a coach
   *
   * @param i [The index of the coach in the coaches array]
   */
  openActionSheet(i: number) {
    let pid = this.coaches[i].pairingId;

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Was möchtest du tun?',
      buttons: [
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.userService.deleteCoach(pid);
          }
        }, {
          text: 'Bearbeiten',
          handler: () => {
            console.log('Coach bearbeiten');
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
   * Read coaches from database and watch for changes
   * If change occurs automatically reload array
   */
  private initializeCoaches() {
    this.userService.getCoaches().on('value', pairings => {
      let dbPairings = pairings.val();
      let coachesArr: any[] = [];

      for (let pairingId in dbPairings) {
        let pairing = dbPairings[pairingId];

        this.userService.getUserRefById(pairing.coach).once('value', user => {
          let newCoach = user.val();
          newCoach._id = pairing.coach;
          newCoach.pairingId = pairingId;

          if(!pairing.deleted) {
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

      for (let inviteId in dbInvites) {
        let invite = dbInvites[inviteId];

        //Identify coach and add to array
        this.userService.getUserRefById(invite.coach).once('value', user => {
          let newCoach = user.val();
          newCoach._id = invite.coach;
          newCoach.inviteId = inviteId;

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
