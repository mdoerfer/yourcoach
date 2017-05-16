import { Component } from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';

/**
 * Generated class for the CreateTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  constructor(private alertCtrl: AlertController) {
  }
  showAnswer() {
    let prompt = this.alertCtrl.create({
      title: 'Art der Rückmeldung',
      inputs: [
        {
          type: 'radio',
          name: 'choice1',
          label: 'Text'
        },
        {
          type: 'radio',
          name: 'choice2',
          label: 'Bild'
        },
        {
          type: 'radio',
          name: 'choice3',
          label: 'Video'
        },
        {
          type: 'radio',
          name: 'choice4',
          label: 'Sprachnachricht'
        },
        {
          type: 'radio',
          name: 'choice5',
          label: 'Definierte Auswahl...'
        },
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
        },
        {
          text: 'Senden'
        }
      ]
    });
    prompt.present();
  }

}
