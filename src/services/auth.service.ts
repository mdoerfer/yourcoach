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
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        // get user -> user & user veriffied
      });
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
   * Returns currently active user
   *
   * @returns {firebase.User|null}
   */
  getActiveUser() {
    return firebase.auth().currentUser;
  }
}
