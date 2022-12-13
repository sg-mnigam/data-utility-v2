import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { HttpRequest } from '../frameworks/httpRequest';
//@ts-ignore
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuth } from '@okta/okta-auth-js';
import * as global from '../global/url.okta';
import { environment } from 'src/environments/environment';
// import { StorageUtil } from '../frameworks/StorageUtil';
// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class OktaService {
  private userLoggedIn = new Subject<boolean>();
  oktaAuth: OktaAuth;
  widget: { authClient: OktaAuth; };
  public userdata: any;
  private authData = new BehaviorSubject<string>('');
  timeoutInterval: any;
  accessToken: string = '';
  //@ts-ignore
  // tokenManager: TokenManager;
  //@ts-ignore
  // accessToken: AccessToken

  constructor(private http: HttpClient, 
    // private toastr: ToastrService
    ) {
    
    console.log(window.location.origin)
    this.widget = new OktaSignIn({
      issuer: environment.OKTA_BASE_URL,
      clientId: environment.OKTA_CLIENT_ID,
      redirectUri: window.location.origin,
      scopes: environment.OKTA_SCOPE,
      authParams: {
        tokenManager: {
            storage: 'sessionStorage'
        },
        pkce: true
      }
    });
    // this.oktaAuth = new OktaAuth({
    //   clientId: environment.OKTA_CLIENT_ID,
    //   issuer: environment.OKTA_BASE_URL,
    //   scopes: environment.OKTA_SCOPE,
    //   redirectUri: environment.REDIRECT_URL,
    // });
    this.oktaAuth = this.widget.authClient;
    //when user refresh the window then we need to set time interval again
    if (localStorage.getItem('accessToken')) {
      this.accessToken = localStorage.getItem('accessToken') || '';
      this.runTimeoutInterval(JSON.parse(this.accessToken))
    }
    this.getUserLoggedIn().subscribe((loginResponse) => {
      if (!loginResponse) {
        clearTimeout(this.timeoutInterval)
        console.log('logged in call')
      }
    })


  }

  setAuthValue(data: any) {
    this.userdata = data
    this.authData.next(data)
  }

  getAuthValue() {
    return this.authData.asObservable()
  }

  getWidget() {
    return this.widget;
  }
  get userdatavalue() {
    this.userdata = sessionStorage.getItem('user')
    return this.userdata

  }
  getOktaAuth() {
    return this.oktaAuth
  }
  async runTimeoutInterval(token: any, idToken?: any) {
    //check wether expireAt key coming in the response or not 
    if (token.expiresAt) {
    //   StorageUtil.setItem('accessToken', JSON.stringify(token))
      console.log(token)
      const decodedToken = this.oktaAuth.token.decode(token.accessToken);
      // console.log(decodedToken.header, decodedToken.payload, decodedToken.signature);
      if (decodedToken && decodedToken.payload && decodedToken.payload.userType) {
        // StorageUtil.setItem('userType', decodedToken.payload.userType.toString())
      }
      //get the current time in timestemp format
      const todaysDate = new Date().getTime();
      //convert the unix timestamp expireAt format into normal timestamp format
      const expirationDate = new Date(token.expiresAt * 1000).getTime()
      //calculate the time difference btw current time to expire time
      const timeInterval = (expirationDate - 300000) - todaysDate;
      //set a timeout for  that timeout interval
      this.timeoutInterval = setTimeout(() => {


        if (token.scopes && Array.isArray(token.scopes)) {
          token.scopes.push('offline_access')
        }
        console.log("timeoutInterval", token)
        //call renew token method inside token manager
        this.oktaAuth.tokenManager.renewToken(token).then((res: any) => {
          console.log('res', res);
          //store new token in local storage
        //   StorageUtil.setItem('token', res.accessToken)
          //clear the existing timeout interval
          clearTimeout(this.timeoutInterval)
        //   this.toastr.success('Successfully!', 'Your token is renew!');
          //call timeout interval method again for new token that is generated by renew token method
          this.runTimeoutInterval(res);
        })
      }, timeInterval
      );
    }
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

}