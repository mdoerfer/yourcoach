import firebase from 'firebase';

export class AuthService {

  /**
   * Sign a user up
   *
   * @param email
   * @param password
   * @returns {firebase.Promise<any>}
   */
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  /**
   * Sign a user in
   *
   * @param email
   * @param password
   * @returns {firebase.Promise<any>}
   */
  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /**
   * Sign a user out
   *
   * @returns {firebase.Promise<any>}
   */
  signout() {
    return firebase.auth().signOut();
  }

  /**
   * Send password reset email
   *
   * @param email
   * @returns {firebase.Promise<any>}
   */
  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /**
   * Get the currently authenticated user
   *
   * @returns {firebase.User|null}
   */
  getAuthenticatedUser() {
    return firebase.auth().currentUser;
  }

  /**
   * Sets the user node in the firebase database to the passed object
   * and overrides any properties that might have existed prior to calling
   * the method
   *
   * @param ref
   */
  setUserRef(ref: object) {
    let uid = this.getAuthenticatedUser().uid;

    firebase.database().ref('users/' + uid).set(ref);
  }

  /**
   * Returns the promise containing the user node
   *
   * @returns {firebase.Promise<any>}
   */
  getUserRef() {
    let uid = this.getAuthenticatedUser().uid;

    return firebase.database().ref('/users/' + uid).once('value');
  }
}
