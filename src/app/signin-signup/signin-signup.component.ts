import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../services/login-service/login.service';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss'],
  animations: [
    trigger('formState', [
      state('hide', style({
        opacity: 0,
        display: 'none',
      })),
      state('show', style({
        opacity: 1,
        display: 'block',
      })),
      transition('show <=> hide', animate('0.5s'))
    ])
  ]
})


export class SigninSignupComponent implements OnInit {

  state = 'login';
  isLoaderVisible: boolean = false;
  interval: ReturnType<typeof setTimeout> | undefined;
  submitted = false; //for form validation purposes

  constructor(
    private loginService: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  //login form
  loginForm = this.formBuilder.group({
    usernameField: ['', [Validators.required, Validators.email]],
    passwordField: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
  });


  //regiteration form
  registerForm = this.formBuilder.group({
    regUsernameField: ['', [Validators.required, Validators.minLength(3)]],
    regPasswordField: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    regEmailField: ['', [Validators.email, Validators.required]],
  });

  // convenience getter for easy access to login form fields  to use inside template/html file (Now we can just use 'myLoginForm' in html)
  get myLoginForm() { return this.loginForm.controls }

  // convenience getter for easy access to register form fields to use inside template/html file (Now we can just use 'myRegisterForm' in html)
  get myRegisterForm() { return this.registerForm.controls }

  changeForm() {
    this.state = (this.state == 'login') ? 'register' : 'login';
  }

  login() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    let usernameLogin: String = "";
    let passwordLogin: String = "";

    console.log(this.loginForm.value);

    usernameLogin = this.loginForm.controls['usernameField'].value;
    passwordLogin = this.loginForm.controls['passwordField'].value;
    console.log("username: " + usernameLogin + "\n" + "password: " + passwordLogin);

    this.clearFormFields();

    this.startLoader();
    
    this.loginService.loginUser();

    this.router.navigateByUrl('/home');
  }

  register() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let usernameRegister: String = "";
    let passwordRegister: String = "";
    let emailRegister: String = "";

    usernameRegister = this.registerForm.controls['regUsernameField'].value;
    passwordRegister = this.registerForm.controls['regPasswordField'].value;
    emailRegister = this.registerForm.controls['regEmailField'].value;
    console.log("username: " + usernameRegister + "\t|\t" + "password: " + passwordRegister + "\t|\t" + "email: " + emailRegister);

    this.clearFormFields();

    this.startLoader();

  }

  clearFormFields() {

    this.submitted = false;
    //checks which form is being displayed right now, login or register then clears its
    (this.state == 'login') ? this.loginForm.reset() : this.registerForm.reset();
  }

  startLoader() {
    this.isLoaderVisible = true; //displaying loader by setting this property to true bcos it's set as condition on ngIf

    //stops loader after 3 seconds by setting isLoaderVisible property to false
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.isLoaderVisible = false;
    }, 3000); //runs the above code after 3 seconds just ONCE (unlike setInterval() which keeps calling the code after every 3 seconds (if set for 3 seconds interval))
  };

  ngOnInit(): void {
  }

}
