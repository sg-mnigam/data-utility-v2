import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { StorageUtil } from '../frameworks/StorageUtil';
import { OktaService } from '../service/okta.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  tokenPayload: any;

  constructor(private _router: Router, private oktaService: OktaService) { }
  
  
  async canActivate() {
    try {
      var session = this.oktaService.getOktaAuth().isAuthenticated()
      if (localStorage.getItem('token') && session) {
        return true;
      }
      else {
        this._router.navigate(['/okta/login']);
        return false;
      }
    }
    catch (e) {
      this._router.navigate(['/okta/login']);
      return false;
    }
  }
  checksession() {

  }

}