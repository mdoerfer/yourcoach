import { Component } from '@angular/core';
import {IonicPage, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-create-task',
  templateUrl: 'create-task.html',
})
export class CreateTaskPage {
  difficulty: string;

  constructor(private alertCtrl: AlertController) {
  }

  onCreateTask(form: NgForm) {
    console.log(form.value);
    console.log('Test');
  }

  setDifficulty(d: string) {
    this.difficulty = d;
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
          text: 'Auswählen',
          handler: data => {
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

}
