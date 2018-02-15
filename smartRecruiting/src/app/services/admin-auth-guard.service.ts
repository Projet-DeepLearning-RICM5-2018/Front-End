import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getConnected() && this.auth.getAdmin()) {
      console.log(localStorage.getItem('token'));
      console.log(this.auth.getAdmin);
      return true;
    }
    else {
      this.router.navigateByUrl('/');
      return false;
    }
  }

}
