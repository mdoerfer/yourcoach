import { Component } from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';

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
          text: 'Auswählen'
        }
      ]
    });
    prompt.present();
  }

}
