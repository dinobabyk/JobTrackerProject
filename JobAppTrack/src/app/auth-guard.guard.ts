// import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

// export class AuthGuard implements CanActivate {
//   constructor(
//     private router: Router) {
//   }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//       console.log("canActivate")
//     const loggedIn = sessionStorage.getItem('username')
//     if (loggedIn) {
//       return true;
//     }
//     // this.router.navigate(['/login']);
//     return false;
//   }
//   // canActivateChild(
//   //   next: ActivatedRouteSnapshot,
//   //   state: RouterStateSnapshot): boolean {
//   //   return this.canActivate(next, state);
//   // }
// }
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  userRole = 'adminm';

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const loggedIn = sessionStorage.getItem('accessToken')
    if (loggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}