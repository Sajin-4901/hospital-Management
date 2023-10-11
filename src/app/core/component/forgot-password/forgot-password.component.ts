import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  signup: boolean = false;
  forgotPassword : boolean = false;
  signUpAndForgotPassword = new UntypedFormGroup({});
  constructor(private router: Router,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.url.subscribe((res: any) => {
      if (res && res[0] && res[0].path && res[0].path == 'signup') {
        this.signup = true;
        this.signUp();
      }else if(res && res[0] && res[0].path && res[0].path == 'forgotPassword'){
        this.forgotPassword = true;
      }
    })
  }

  signUp() {
    this.signUpAndForgotPassword = new UntypedFormGroup({
      email: new UntypedFormControl(null, {
        validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]
      })
    })
  }
  signInPage() {
    this.router.navigate(['/signin'])
  }



}
