import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-role-choice',
  templateUrl: 'role-choice.html',
})
export class RoleChoicePage {
  constructor(private authService: AuthService) {}

  setRole(role: string) {
    this.authService.setUserRole(role);

    //TODO: Open correct dashboard
  }

}
