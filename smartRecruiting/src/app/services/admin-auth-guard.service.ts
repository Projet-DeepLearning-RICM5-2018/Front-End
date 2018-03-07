import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    let user = this.auth.getConnectedUser().value;
    if (user && user.is_admin) {
      return true;
    }
    else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
