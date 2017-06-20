import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';

@Injectable()
export class FileService {
  constructor(private file: File) {}

  /**
   * Upload file to storage
   *
   * @param _filePath
   */
  uploadFileToStorage(_filePath, taskId) {
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
