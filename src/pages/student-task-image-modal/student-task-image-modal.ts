import {Component} from '@angular/core';
import {ActionSheetController, NavParams, Platform, ViewController} from "ionic-angular";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';

@Component({
  selector: 'page-student-task-image-modal',
  templateUrl: 'student-task-image-modal.html',
})
export class StudentTaskImageModalPage {

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
      title: 'Bild Rückmeldung hochladen/erstellen',
      buttons: [
        {
          text: 'Neues Bild aufnehmen',
          handler: () => {
            this.addNewImage();
          }
        },{
          text: 'Aus Album hochladen',
          handler: () => {
            this.addImageFromGallery();
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
  addNewImage() {
    this.mediaCapture.captureImage()
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
   * Add from gallery
   */
  addImageFromGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.ALLMEDIA
    }).then((_filePath) => {
      let path;

      if(this.platform.is('android')) {
        path = 'file://' + _filePath;
      }
      else {
        path = _filePath.replace('file://', '');
      }

      this.response = this.readFileInfo(path);
    }, (err) => {
      console.error(err);
    });
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
