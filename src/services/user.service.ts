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

  /**
   * Send an invite to a student
   *
   * @param email
   * @returns {firebase.Promise<any>}
   */
  sendInviteToStudent(email: string) {
    //Coach ID
    let uid = this.getUser().uid;

    //Find student
    firebase.database().ref('/users').orderByChild('email').equalTo(email).once('child_added', snapshot => {
      //Student ID
      let sid = snapshot.key;

      //Add inquiry to inquiries node to sid
      return firebase.database().ref('/users/' + sid + '/invites/' + uid).update({
        created_at: new Date().valueOf()
      });
    });
  }

  /**
   * Accept/decline an invite from a coach
   *
   * @param cid
   * @param accepted
   */
  respondToInviteFromCoach(cid: string, accepted: boolean) {
    //Student ID
    let uid = this.getUser().uid;

    //Delete invite from student
    firebase.database().ref('/users/' + uid + '/invites/' + cid).remove()
      .then(data => {
        if(accepted) {
          //Add student to coach
          return firebase.database().ref('/users/' + cid + '/students/' + uid).update({
            created_at: new Date().valueOf()
          })
            .then(data => {
              console.log('Student accepted invite');
            })
            .catch(error => {
              console.log(error.message);
            });
        }
        else {
          console.log('Student declined invite');
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
