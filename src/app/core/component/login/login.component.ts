import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private router : Router){

  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login(){
    if(this.loginForm && this.loginForm.valid){
      console.log('loginForm : ',this.loginForm?.value);
    }
  }
  forgotPassword(){
    console.log('forgotpassword');
this.router.navigate(['/forgotPassword'])
  }

}
