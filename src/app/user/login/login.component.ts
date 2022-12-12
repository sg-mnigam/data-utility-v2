import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      let data = {
        ...this.loginForm.value,
        name: 'Developer'
      }
      console.log(data);
      this.api.post(environment.API_URL + '/api/authaccount/login', data).subscribe(res => {
        if (res) {
          sessionStorage.setItem('state', JSON.stringify(res))
          this.router.navigateByUrl('/main')
        }
      })

    }
  }
}
