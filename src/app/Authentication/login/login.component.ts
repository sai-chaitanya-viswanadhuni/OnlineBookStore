import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginData: any = {
    username: '',
    password: ''
  };

  loginForm: FormGroup;
  statusMessage: string;
  invalidLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private auth_service: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login() {
  //   console.log(this.loginForm.value.username, this.loginForm.value.password);
  //   if (this.auth_service.authenticate(this.loginForm.value.username, this.loginForm.value.password)) {
  //     this._router.navigate(["/"]);
  //     this.invalidLogin = false;
  //   }
  //   else {
  //     this.invalidLogin = true;
  //     this.statusMessage = "Invalid Credentials !!";
  //   }
  // }

  login() {
    (this.auth_service.authenticate(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      data => {
        this.invalidLogin = false;
        this.statusMessage = "Logging in ..."
        console.log(data);
        this._router.navigate(['/']);
      },
      error => {
        this.invalidLogin = true;
        this.statusMessage = "Login Failed !!"
        console.error(error);
      }
    )
    );
  }

 
}