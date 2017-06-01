import firebase from 'firebase';
import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";

@Injectable()
export class AuthService {

  constructor(private events: Events) {

  }

  /**
   * Sign a user up
   *
   * @param email
   * @param password
   * @returns {firebase.Promise<any>}
   */
  signup(email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.events.publish('auth:signup-success', {
          message: 'Registrierung erfolgreich',
          user: this.getActiveUser()
        });
      }, error => {
        this.events.publish('auth:signup-failed', {
          message: error.message
        });
      });
  }

  /**
   * Sign a user in
   *
   * @param email
   * @param password
   * @returns {firebase.Promise<any>}
   */
  signin(email: string, password: string) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.events.publish('auth:signin-success', {
          message: 'Login erfolgreich',
          user: this.getActiveUser()
        });
      }, error => {
        this.events.publish('auth:signin-failed', {
          message: error.message
        });
      });
  }

  /**
   * Sign a user out
   *
   * @returns {firebase.Promise<any>}
   */
  signout() {
    return firebase.auth()
      .signOut()
      .then(data => {
        this.events.publish('auth:signout-success', {
          message: 'Logout erfolgreich',
          user: this.getActiveUser()
        });
      }, error => {
        this.events.publish('auth:signout-failed', {
          message: error.message
        });
      });
  }

  /**
   * Send password reset email
   *
   * @param email
   * @returns {firebase.Promise<any>}
   */
  resetPassword(email: string) {
    return firebase.auth()
      .sendPasswordResetEmail(email)
      .then(data => {
        this.events.publish('auth:reset-password-success', {
          message: 'Passwort erfolgreich zurückgesetzt',
          user: this.getActiveUser()
        });
      }, error => {
        this.events.publish('auth:reset-password-failed', {
          message: error.message
        });
      });
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
