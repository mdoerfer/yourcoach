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
   * the method, or creates new properties if they haven't existed before
   *
   * @param ref
   */
  setUserRef(ref: object) {
    let uid = this.getUser().uid;

    firebase.database().ref('users/' + uid).set(ref);
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
}
