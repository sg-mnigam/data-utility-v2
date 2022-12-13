import { ChangeDetectorRef, Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { ApiGenerator } from '../okta-shared-resource/frameworks/ApiGenerator'
// import { StorageUtil } from '../okta-shared-resource/frameworks/StorageUtil';
// import { AuthResp } from '../okta-shared-resource/models/auth.model';
import { OktaService } from '../okta-shared-resource/service/okta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  oktaSignIn: any;
  user: any;
  okta: boolean = false;
  session: any;


  constructor(public router: Router, private ngzone: NgZone,
    private formBuilder: FormBuilder, private oktaService: OktaService, private changeDetectorRef: ChangeDetectorRef, private routes: ActivatedRoute) {
    this.form = this.formBuilder.group({});
    this.oktaSignIn = oktaService.getWidget();

  }

  async ngOnInit(): Promise<void> {
    try {
      let session:any = await this.oktaService.getOktaAuth().isAuthenticated();
      if (session) {
        this.router.navigateByUrl('/main');
      }
      else {
        this.showLogin()
      }
      this.form = this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\"]*$')
        ])
      });
    }
    catch (error) {
      // this.showLogin();
    }

  }
  showLogin(): void {
    this.oktaSignIn.renderEl({ el: '#okta-login-container' }, (response: any) => {
      if (response.status === 'SUCCESS') {
        console.log(response)
        this.user = response.tokens.idToken.claims.email;
        // StorageUtil.setItem('user', this.user)
        // StorageUtil.setItem('username', response.tokens.idToken.claims.name)
        // StorageUtil.setItem('token', response.tokens.accessToken.accessToken)
        // let clientName = response.tokens.accessToken.claims.clientName;
        // if (clientName && clientName != "null" && clientName != "undefined" && clientName != "") {
        //   StorageUtil.setItem('clientNameValue', clientName);
        // } else {
        //   StorageUtil.setItem('clientNameValue', "covermycarus");
        // }
        this.oktaService.runTimeoutInterval(response.tokens.accessToken, response.tokens.idToken)
        let spacePosition = response.tokens.idToken.claims.name.indexOf(' ');
        let firstName = response.tokens.idToken.claims.name.substring(0, spacePosition);
        if (firstName != null) {
          sessionStorage.setItem('userFirstName', firstName);
        } else {
          sessionStorage.setItem('userFirstName', " ");
        }
        // let usertype = StorageUtil.getItem('userType');
        this.router.navigateByUrl('/main');
        this.oktaSignIn.remove();
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  // onSubmit() {
  //   console.log(this.form.value)
  //   let data = {
  //     username: this.form.value.email,
  //     password: this.form.value.password
  //   }
  //   console.log(data)
  //   const request = ApiGenerator.oktaLogin(data)
  //   console.log(request)
  //   this.oktaService.callHttpReq(request).subscribe((res: AuthResp) => {
  //     if (res.response.status === 'SUCCESS') {
  //       sessionStorage.setItem('token', res.response.sessionToken)
  //       sessionStorage.setItem('user', JSON.stringify(res.response._embedded.user))
  //       this.oktaService.setAuthValue(res.response._embedded.user)
  //       console.log('hello')
  //       this.router.navigate(['/layout']);
  //     }
  //   }, (err => {
  //     console.log(err)
  //     alert('WRONG CREDENTIAL!!!!')

  //   }))

  // }

  public checkError = (controlName: string, errorName: string) => {

    return this.form.controls[controlName].touched && this.form.controls[controlName].hasError(errorName);

  }



}
