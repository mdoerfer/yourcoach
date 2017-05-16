import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {UserService} from "../../services/user.service";


@IonicPage()
@Component({
  selector: 'page-student-dashboard',
  templateUrl: 'student-dashboard.html',
})
export class StudentDashboardPage implements OnInit {
  private pendingInvites: any[] = [];

  constructor(private userService: UserService) {
  }

  /**
   * Init component
   */
  ngOnInit() {
    this.initializePendingInvites();
  }

  onAcceptInvite(i: number) {
    let cid = this.pendingInvites[i]._id;

    this.userService.acceptInviteById(cid);
  }

  onDeclineInvite(i: number) {
    let cid = this.pendingInvites[i]._id;

    this.userService.removeInviteById(cid);
  }

  /**
   * Get pending invites from coaches
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

      console.log(this.pendingInvites);
    });
  }
}
