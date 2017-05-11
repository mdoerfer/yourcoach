import firebase from 'firebase';

export class AuthService {

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  setUserRole(role: string) {
    let uid = this.getCurrentUser().uid;

    firebase.database().ref('users/' + uid).set({
      role: role
    });
  }

  getUserRole() {
    let uid = this.getCurrentUser().uid;

    firebase.database().ref('/users/' + uid).once('value').then(snapshot => {
     console.log(snapshot.val());
    });
  }
}
