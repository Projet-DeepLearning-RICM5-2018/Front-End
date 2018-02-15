import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  constructor(private auth: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getConnected()) {
      console.log(this.auth.getConnected());
      console.log(this.auth.getAdmin());
      return true;
    }
    else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
