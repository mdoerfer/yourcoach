import firebase from 'firebase';

export class UserService {
  /**
   * Get the currently authenticated user
   *
   * @returns {firebase.User|null}
   */
  getUser() {
    return firebase.auth().currentUser;
  }

  /**
   * Sets the user node in the firebase database to the passed object
   * and overrides any properties that might have existed prior to calling
   * the method.
   *
   * @param ref
   * @returns {firebase.Promise<any>}
   */
  setUserRef(ref: object) {
    let uid = this.getUser().uid;

    return firebase.database().ref('users/' + uid).set(ref);
  }

  /**
   * Updates the user node in the firebase database with the provided object
   * and doesn't override any properties except existing ones
   *
   * @param ref
   * @returns {firebase.Promise<any>}
   */
  updateUserRef(ref: object) {
    let uid = this.getUser().uid;

    return firebase.database().ref('users/' + uid).update(ref);
  }

  /**
   * Returns the promise containing the user node
   *
   * @returns {firebase.Promise<any>}
   */
  getUserRef() {
    let uid = this.getUser().uid;

    return firebase.database().ref('/users/' + uid).once('value');
  }

  inviteStudent(email: string) {
    let uid = this.getUser().uid;

    /**
     * Find student
     */
    firebase.database().ref('/users').orderByChild('email').equalTo(email).once('child_added', snapshot => {
      let sid = snapshot.key;

      this.sendInquiryToStudent(sid);
      /**
       * Add student to students node but inactive
       */
      return firebase.database().ref('/users/' + uid + '/students/' + sid).update({
        accepted: false
      });

    });


  }

  sendInquiryToStudent(sid: string) {
    let uid = this.getUser().uid;
    /**
     * Add inquiry to inquiries node to sid
     */
    return firebase.database().ref('/users/' + sid + '/inquiries/' + uid).update({read: false});

  }
}
