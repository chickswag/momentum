import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  error : any
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if (this.auth.isAuthenticated()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;

  }
}
