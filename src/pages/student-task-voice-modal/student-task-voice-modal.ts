import {Component} from '@angular/core';
import {ActionSheetController, NavParams, Platform, ViewController} from "ionic-angular";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';

@Component({
  selector: 'page-student-task-voice-modal',
  templateUrl: 'student-task-voice-modal.html',
})
export class StudentTaskVoiceModalPage {

  task: any;
  response: any = null;

  constructor(public viewCtrl: ViewController,
              private platform: Platform,
              private navParams: NavParams,
              private camera: Camera,
              private mediaCapture: MediaCapture,
              private actionSheetCtrl: ActionSheetController) {

    this.task = this.navParams.get('task');
  }

  /**
   * Show add response action sheet
   */
  addResponse() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sprachnachricht Rückmeldung erstellen',
      buttons: [
        {
          text: 'Sprachnachricht aufnehmen',
          handler: () => {
            this.addNewVoice();
          }
        }, {
          text: 'Abbrechen',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Add video
   */
  addNewVoice() {
    this.mediaCapture.captureAudio()
      .then(
        (data: MediaFile[]) => {
          for (let i = 0; i < data.length; i++) {
            this.response = this.readFileInfo(data[i].fullPath);
          }
        }, (err: CaptureError) => {
          console.error(err);
        }
      );
  }

  /**
   * Read file name and type from path
   */
  readFileInfo(path) {
    let fileName, fileType;

    fileName = path.split('/').pop();
    fileType = fileName.split('.').pop();

    return {
      url: path,
      type: fileType,
      name: fileName
    }
  }

  /**
   * Remove response
   */
  removeResponse() {
    this.response = null;
  }

  /**
   * Submit response
   */
  submitResponse() {
    this.viewCtrl.dismiss(this.response);
  }

  /**
   * Closes text modal
   */
  dismissModal(){
    this.viewCtrl.dismiss();
  }


}
