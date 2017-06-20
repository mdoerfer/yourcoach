import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';

@Injectable()
export class FileService {
  constructor(private file: File) {
  }

  /**
   * Upload file to storage
   *
   * @param _filePath
   */
  uploadFileToStorage(_filePath, taskId, uploadType) {
    alert(_filePath);

    //Resolve filesystem url
    this.file.resolveLocalFilesystemUrl(_filePath)
      .then(_fileEntry => {

        //Get directory and file name
        let directoryPath = _fileEntry.nativeURL.replace(_fileEntry.name, '');
        let fileName = _fileEntry.name;

        this.file.readAsDataURL(directoryPath, fileName)
          .then(_dataString => {
            let suffix, node;

            //Upload
            switch (uploadType) {
              case 'image':
                suffix = '.jpg';
                node = 'images/';
                break;
              case 'video':
                suffix = '.mp4';
                node = 'videos/';
                break;
              case 'voice':
                suffix = '.mp3';
                node = 'voice/';
                break;
              default:
                suffix = '.jpg';
                node = 'images/';
            }

            let uploadedFileName = new Date().getTime() + suffix;
            let fileRef = firebase.storage().ref('uploads/' + taskId + '/' + node + uploadedFileName);

            //Promise
            let uploadTask = fileRef.putString(_dataString, 'data_url');

            //Upload image
            uploadTask.then(function (_snapshot) {
              //Console
              console.log(uploadType + ' was uploaded');

              //Add reference to task
              firebase.database().ref('/tasks/' + taskId + '/attachments/' + node).push(uploadTask.snapshot.downloadURL);
            });
          })
      });
  }
}
