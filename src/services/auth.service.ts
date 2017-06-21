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
   * @param name
   * @param email
   * @param password
   * @returns {firebase.Promise<any>}
   */
  signup(name: string, email: string, password: string) {
    return firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        //Get user
        let user = this.getActiveUser();

        //Create database node for user
        firebase.database().ref('/users/' + user.uid).update({
          name: name,
          email: email,
          deleted: false,
          created_at: new Date().valueOf(),
          updated_at: new Date().valueOf()
        }).then(data => {
          //Send verification email
          user.sendEmailVerification()
            .then(data => {
              this.events.publish('auth:signup-success', {
                message: 'Registrierung erfolgreich. Bitte klicken Sie den Aktivierungs-Link in der Ihnen zugesandten Email.',
                user: this.getActiveUser()
              });
            }, error => {
              this.events.publish('auth:signup-failed', {
                message: error.message
              });
            });
        }, error => {
          this.events.publish('auth:signup-failed', {
            message: error.message
          });
        })
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
        let user = this.getActiveUser();

        if (user.emailVerified) {
          this.events.publish('auth:signin-verified', {
            message: 'Login erfolgreich',
            user: this.getActiveUser()
          });
        }
        else {
          this.events.publish('auth:signin-unverified', {
            message: 'Ihr Konto ist noch nicht aktiviert. Bitte überprüfen Sie Ihr E-Mail Postfach.',
            user: this.getActiveUser()
          });
        }
      }, error => {
        this.events.publish('auth:signin-failed', {
          message: error.message
        });
      });
  }

  /**
   * Change user password
   */
  changePassword(oldPass: string, newPass: string) {
    if (!oldPass.length || !newPass.length) {
      this.events.publish('auth:change-password-failed', {
        message: 'Bitte fülle alle Felder aus.'
      });
    }

    let user = this.getActiveUser();

    return firebase.auth()
      .signInWithEmailAndPassword(user.email, oldPass)
      .then(data => {
        user.updatePassword(newPass)
          .then(data => {
            this.events.publish('auth:change-password-success', {
              message: 'Passwort erfolgreich geändert'
            });
          }, error => {
            this.events.publish('auth:change-password-failed', {
              message: error.message
            });
          });
      }, error => {
        this.events.publish('auth:change-password-failed', {
          message: error.message
        });
      });
  }

  /**
   * Delete user
   */
  deleteUser(pass: string) {
    if (!pass.length) {
      this.events.publish('auth:delete-user-failed', {
        message: 'Bitte fülle alle Felder aus.'
      });
    }

    let user = this.getActiveUser();

    firebase.database().ref('/users/' + user.uid).update({
      deleted: true
    }).then(data => {
      //Delete auth node
      firebase.auth()
        .signInWithEmailAndPassword(user.email, pass)
        .then(data => {
          user.delete()
            .then(data => {
              this.events.publish('auth:delete-user-success', {
                message: 'Konto erfolgreich gelöscht'
              });
            }, error => {
              this.events.publish('auth:delete-user-failed', {
                message: error.message
              });
            })
        }, error => {
          this.events.publish('auth:delete-user-failed', {
            message: error.message
          });
        });
    }, error => {
      this.events.publish('auth:delete-user-failed', {
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
