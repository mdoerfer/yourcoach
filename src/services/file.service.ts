import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';
import {Platform} from "ionic-angular";

@Injectable()
export class FileService {
  constructor(private file: File,
              private platform: Platform) {
  }

  /**
   * Upload file to storage
   *
   * @param _filePath
   */
  uploadFileToStorage(_filePath, taskId) {
    if (this.platform.is('android')) {
      /**
       *
       * UPLOAD FOR ANDROID
       *
       */

      //Resolve filesystem url
      this.file.resolveLocalFilesystemUrl(_filePath)
        .then(_fileEntry => {

          //Get directory and file name
          let directoryPath = _fileEntry.nativeURL.replace(_fileEntry.name, '');
          let fileName = _fileEntry.name;

          this.file.readAsDataURL(directoryPath, fileName)
            .then(_dataString => {
              let uploadedFileName = new Date().getTime() + '_' + fileName;
              let fileRef = firebase.storage().ref('uploads/' + taskId + '/' + uploadedFileName);

              //Promise
              let uploadTask = fileRef.putString(_dataString, 'data_url');

              //Upload image
              uploadTask.then(function (_snapshot) {
                //Console
                console.log('Attachment was uploaded');

                //Add reference to task
                firebase.database().ref('/tasks/' + taskId + '/attachments/').push(uploadTask.snapshot.downloadURL);
              });
            })
        });
    }
    else {
      /**
       *
       * UPLOAD FOR IOS & CO
       *
       */
      fetch(_filePath)
        .then((_response) => {
          //Turn response into blob
          _response.blob()
            .then(_blob => {
              let filePathArr = _filePath.split('/');
              let fileName = filePathArr[filePathArr.length - 1];

              alert(fileName);

              //Check type
              let uploadedFileName = new Date().getTime() + _filePath;
              let fileRef = firebase.storage().ref('uploads/' + taskId + '/' + uploadedFileName);

              //Promise
              let uploadTask = fileRef.put(_blob);

              //Upload image
              uploadTask.then(function (_snapshot) {
                //Console
                console.log('Attachment was uploaded');

                //Add reference to task
                firebase.database().ref('/tasks/' + taskId + '/attachments/').push(uploadTask.snapshot.downloadURL);
              });
            });
        });
    }
  }
}
