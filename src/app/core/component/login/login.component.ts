import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

}
