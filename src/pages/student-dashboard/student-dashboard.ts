import {Component, OnInit} from '@angular/core';
import {ActionSheetController, Events, IonicPage, NavController, PopoverController} from 'ionic-angular';
import {StudentTaskPage} from "../student-task/student-task";
import {DashboardPopoverPage} from "../dashboard-popover/dashboard-popover";
import {InviteService} from "../../services/invite.service";
import {CoachService} from "../../services/coach.service";
import {AlertController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  private searchIsActive: boolean = false;
  private searchQuery: string = '';
  private coaches: any[] = [];
  private pendingInvites: any[] = [];

  constructor(private inviteService: InviteService,
              private coachService: CoachService,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private events: Events) {
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.loadInvites();
    this.subscribeInvites();

    this.loadCoaches();
    this.subscribeCoaches();
  }


  /**
   * Load initial coaches from service
   */
  private loadCoaches() {
    this.coaches = this.coachService.getCoaches();
  }

  /**
   * Subscribe to coaches and listen for changes
   */
  private subscribeCoaches() {
    //Listen for changes
    this.events.subscribe('coaches:changed', coaches => {
      this.coaches = coaches;
    })
  }

  /**
   * Load initial invites from service
   */
  private loadInvites() {
    this.pendingInvites = this.inviteService.getInvites();
  }


  /**
   * Subscribe to invites and listen for changes
   */
  private subscribeInvites() {
    //Listen for changes
    this.events.subscribe('invites:changed', invites => {
      this.pendingInvites = invites;
    })
  }

  /**
   * Accept invite
   *
   * @param i Index of the invite in the array
   */
  onAcceptInvite(i: number) {
    let iid = this.pendingInvites[i].inviteId;
    let cid = this.pendingInvites[i]._id;

    this.inviteService.acceptInviteById(iid, cid);
  }

  /**
   * Decline invite
   *
   * @param i Index of the invite in the array
   */
  onDeclineInvite(i: number) {
    let iid = this.pendingInvites[i].inviteId;
    let cid = this.pendingInvites[i]._id;

    this.inviteService.declineInviteById(iid, cid);
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
   * Open alert for backup
   *
   * @param i [The index of the coach in the coaches array]
   */

  showConfirm(pid: string) {
    let confirm = this.alertCtrl.create({
      title: 'Coach löschen',
      message: 'Möchtest du den Coach wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            this.coachService.deleteCoach(pid);
          }
        }
      ]
    });
    confirm.present();
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

  /**
   * Toggle search
   */
  toggleSearch() {
    this.searchIsActive = !this.searchIsActive;
  }

  search() {
    let matches = this.coaches.filter((coach) => {
      return coach.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
    });

    console.log(matches);
  }
}
