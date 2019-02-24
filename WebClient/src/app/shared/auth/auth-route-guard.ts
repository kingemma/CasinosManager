import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AppSessionService } from './app-session.service'

@Injectable({
  providedIn: 'root',
})
export class AppRouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private _router: Router,
    private _sessionService: AppSessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.url);
    if (!this._sessionService.user) {
      this._router.navigate(['/account']);
      return false;
    }else{
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    if (!this._sessionService.user) {
      return '/account';
    }

    return '/content';
  }
}
