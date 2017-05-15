import {Component} from '@angular/core';
import {IonicPage, PopoverController, AlertController} from 'ionic-angular';
import {MorePopoverPage} from "./more-popover/more-popover";
import {UserService} from "../../services/user.service";

@IonicPage()
@Component({
  selector: 'page-coach-dashboard',
  templateUrl: 'coach-dashboard.html',
})
export class CoachDashboardPage {
  constructor(private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private userService: UserService) {
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
            this.userService.inviteStudent(data.email);
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
