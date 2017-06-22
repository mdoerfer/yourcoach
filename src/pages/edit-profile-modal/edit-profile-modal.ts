import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavParams, Platform, ViewController} from "ionic-angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import {FileService} from "../../services/file.service";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'page-edit-profile-modal',
  templateUrl: 'edit-profile-modal.html',
})
export class EditProfileModalPage implements OnInit {

  user: any;

  profileForm: FormGroup;

  avatar = {
    url: 'assets/images/dummy-avatar.png'
  };

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams,
              private platform: Platform,
              private camera: Camera,
              private mediaCapture: MediaCapture,
              private fileService: FileService,
              private authService: AuthService,
              private actionSheetCtrl: ActionSheetController) {
  }

  /**
   * Initialize the page
   */
  ngOnInit() {
    this.user = this.navParams.get("user");
    this.initializeForm();
  }

  /**
   * Change avatar
   */
  changeAvatar() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profilbild hochladen/erstellen',
      buttons: [
        {
          text: 'Neues Bild',
          handler: () => {
            this.addNewAvatar();
          }
        }, {
          text: 'Aus Album hochladen',
          handler: () => {
            this.addAvatarFromGallery();
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
   * Add avatar
   */
  addNewAvatar() {
    this.mediaCapture.captureImage()
      .then(
        (data: MediaFile[]) => {
          for (let i = 0; i < data.length; i++) {
            this.avatar = this.readFileInfo(data[i].fullPath);
            this.fileService.uploadFileToStorage(this.avatar.url, this.authService.getActiveUser().uid, 'avatar');
          }
        }, (err: CaptureError) => {
          console.error(err);
        }
      );
  }

  /**
   * Add from gallery
   */
  addAvatarFromGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType: this.camera.MediaType.ALLMEDIA
    }).then((_filePath) => {
      let path;

      if (this.platform.is('android')) {
        path = 'file://' + _filePath;
      }
      else {
        path = _filePath.replace('file://', '');
      }

      this.avatar = this.readFileInfo(path);
      this.fileService.uploadFileToStorage(this.avatar.url, this.authService.getActiveUser().uid, 'avatar');
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
   * Initialize the form
   */
  private initializeForm() {
    let formData = {
      name: null,
      aboutMe: null,
      dateOfBirth: null
    };

    //Prefill form with task data if we're in edit mode
    formData.name = this.user.name;
    formData.aboutMe = this.user.aboutMe;
    formData.dateOfBirth = this.user.dateOfBirth;

    //Initialize avatar
    this.avatar = this.user.avatar;

    //Create form
    this.profileForm = new FormGroup({
      name: new FormControl(formData.name),
      aboutMe: new FormControl(formData.aboutMe),
      dateOfBirth: new FormControl(formData.dateOfBirth),
    });
  }

  /**
   * Closes text modal
   */
  dismissModal() {
    this.viewCtrl.dismiss();

  }

  /**
   * Closes text modal with data
   */
  submitForm() {
    this.viewCtrl.dismiss(this.profileForm);
  }


}
