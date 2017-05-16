import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {UserService} from "../../services/user.service";


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  private coaches: any[] = [];
  private pendingInvites: any[] = [];

  constructor(private userService: UserService) {
  }

  /**
   * Init component
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


  private initializeCoaches() {
    this.userService.getCoaches().on('value', coaches => {
      this.coaches = [];

      for (let coachId in coaches.val()) {
        this.userService.getUserRefById(coachId).once('value', user => {
          let newCoach = user.val();
          newCoach._id = coachId;

          this.coaches.push(newCoach);
        })
      }
    })
  }

  /**
   * Get pending invites and the related coaches
   * Automatically update on changes to the database
   */
  private initializePendingInvites() {
    //Get pending invites
    this.userService.getInvites().on('value', invites => {
      this.pendingInvites = [];

      for (let coachId in invites.val()) {
        //Identify coach and add to array
        this.userService.getUserRefById(coachId).once('value', user => {
          let newCoach = user.val();
          newCoach._id = coachId;

          this.pendingInvites.push(newCoach);
        })
      }
    });
  }
}
