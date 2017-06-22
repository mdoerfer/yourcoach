import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';
import {Platform} from "ionic-angular";
import {AuthService} from "./auth.service";

@Injectable()
export class FileService {
  constructor(private file: File,
              private platform: Platform,
              private authService: AuthService) {
  }

  /**
   * Upload attachment to storage
   *
   * @param _filePath
   * @param id
   * @param uploadType
   */
  uploadFileToStorage(_filePath, id, uploadType = 'attachment') {
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
          let fileType = fileName.split('.').pop();
          let timestamp = new Date().getTime();

          this.file.readAsDataURL(directoryPath, fileName)
            .then(_dataString => {
              let uploadedFileName = timestamp + '_' + fileName;
              let fileRef = firebase.storage().ref('uploads/' + id + '/' + uploadedFileName);

              //Promise
              let uploadTask = fileRef.putString(_dataString, 'data_url');

              //Upload image
              uploadTask.then(function (_snapshot) {
                let fileData = {
                  url: uploadTask.snapshot.downloadURL,
                  name: fileName,
                  uploadName: uploadedFileName,
                  type: fileType
                };

                switch (uploadType) {
                  case 'attachment':
                    //Add attachment media reference to task
                    firebase.database().ref('/tasks/' + id + '/attachments/').push(fileData);
                    break;
                  case 'response':
                    //Add response media reference to task
                    firebase.database().ref('/tasks/' + id + '/response').update(fileData);
                  case 'avatar':
                    //Add avatar media reference to user
                    firebase.database().ref('/users/' + id + '/avatar').update(fileData);
                }
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
              let fileName = _filePath.split('/').pop();
              let fileType = fileName.split('.').pop();
              let timestamp = new Date().getTime();

              //Check type
              let uploadedFileName = timestamp + '_' + fileName;
              let fileRef = firebase.storage().ref('uploads/' + id + '/' + uploadedFileName);

              //Promise
              let uploadTask = fileRef.put(_blob);

              //Upload image
              uploadTask.then(function (_snapshot) {
                let fileData = {
                  url: uploadTask.snapshot.downloadURL,
                  name: fileName,
                  uploadName: uploadedFileName,
                  type: fileType
                };

                switch (uploadType) {
                  case 'attachment':
                    //Add attachment media reference to task
                    firebase.database().ref('/tasks/' + id + '/attachments/').push(fileData);
                    break;
                  case 'response':
                    //Add response media reference to task
                    firebase.database().ref('/tasks/' + id + '/response').update(fileData);
                  case 'avatar':
                    //Add avatar media reference to user
                    firebase.database().ref('/users/' + id + '/avatar').update(fileData);
                }
              });
            });
        });
    }
  }
}
