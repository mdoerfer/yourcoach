import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {Platform} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {AuthService} from "./auth.service";
import {TaskService} from "./task.service";

@Injectable()
export class FileService {
  constructor(private platform: Platform,
              private file: File,
              private authService: AuthService) {
  }

  /**
   * Upload file to storage
   *
   * @param _filePath
   */
  uploadFileToStorage(_filePath, taskId) {
    //User ID
    let uid = this.authService.getActiveUser().uid;

    //Resolve filesystem url
    this.file.resolveLocalFilesystemUrl(_filePath)
      .then(_fileEntry => {

        //Get directory and file name
        let directoryPath = _fileEntry.nativeURL.replace(_fileEntry.name, '');
        let fileName = _fileEntry.name;

        this.file.readAsDataURL(directoryPath, fileName)
          .then(_dataString => {

            //Upload
            let uploadedFileName = new Date().getTime() + '.jpg';
            let fileRef = firebase.storage().ref('uploads/' + taskId + '/images/' + uploadedFileName);

            //Promise
            let uploadTask = fileRef.putString(_dataString, 'data_url');

            //Upload image
            uploadTask.then(function (_snapshot) {
              //Console
              console.log('Image was uploaded');

              //Add reference to task
              firebase.database().ref('/tasks/' + taskId + '/attachments/images/').push(uploadTask.snapshot.downloadURL);
            });
          })
      });
  }
}
