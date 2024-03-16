import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginConstant } from '../../constant/loginConstant';
import { CustomValidatorServiceService } from 'src/app/core/service/custom-validator-service.service';
import { AsyncvalidatorService } from '../../service/asyncvalidator.service';
// import { AsyncvalidatorService } from '../../service/asyncvalidator.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  displayContent: any;
  errorMessages:any;

  signup: boolean = false;
  forgotPassword: boolean = false;
  loginConstant: loginConstant;
  signUpAndForgotPassword = new UntypedFormGroup({});
  constructor(private router: Router,
    private CustomValidatorService: CustomValidatorServiceService,
    private route: ActivatedRoute) {
    this.loginConstant = new loginConstant();
  }
  ngOnInit() {
    this.route.url.subscribe((res: any) => {
      if (res && res[0] && res[0].path && res[0].path == 'signup') {
        this.signup = true;
        this.displayContent = this.loginConstant?.onSignup;
        // this.signUp();
      } else if (res && res[0] && res[0].path && res[0].path == 'forgotPassword') {
        this.forgotPassword = true;
        this.displayContent = this.loginConstant?.onForgotPassword;
      }
    });
    this.formInitialization();
    this.errorMessages = this.loginConstant.errorMessage;
  }

  formInitialization() {
    this.signUpAndForgotPassword = new UntypedFormGroup({
      email: new UntypedFormControl(null, {
        validators: [Validators.required,Validators.email],
        asyncValidators:[this.signup ? AsyncvalidatorService.emailAlreadyExists(this.CustomValidatorService) : AsyncvalidatorService.forgotpasswordEmailCheck(this.CustomValidatorService)]
      })
    })
    console.log('value :',this.signUpAndForgotPassword);
  }

  signInPage() {
    this.router.navigate(['/signin'])
  }

  onclick() {
    console.log('entereddd-1...');
    console.log('form : ', this.signUpAndForgotPassword);
    if (this.signUpAndForgotPassword && this.signUpAndForgotPassword?.valid) {
      console.log('entereddd-2...');
      if (this.signup) {
        console.log('entereddd-3...');
        this.CustomValidatorService?.onSignUp(this.signUpAndForgotPassword?.value).subscribe((res: any) => {
          if (res) {
            console.log('success..');
          }
        })
      }
    }
  }



}
