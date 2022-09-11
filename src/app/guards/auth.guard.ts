import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { servicesApi } from '../services/services';

@Injectable({
  providedIn: 'root'
})
export class guardLogin implements CanActivate {
  constructor(private _data: servicesApi,
    private _ruta: Router,
    private _cookie: CookieService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    let isLoggedIn = this._cookie.check('token');
    if (isLoggedIn == true) {
      this._ruta.navigate(['/inicio']);
      return false;
    }
    return true;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _data: servicesApi,
    private _ruta: Router,
    private _cookie: CookieService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    let isLoggedIn = this._cookie.check('token');
    if(isLoggedIn == true){
      return true;
    }else{
      this._ruta.navigate(['/login']);
      return false; 
    }
  }
  checkLogin() {
  }
}
