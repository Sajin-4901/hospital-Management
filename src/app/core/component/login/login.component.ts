import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidatorServiceService } from '../../service/custom-validator-service.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { DialogService } from '../../service/dialog.service';
import { commonConstant } from '../../constant/commonConstant';
// import { commonConstant } from '../../constant/commonConstant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  deviceInfo: any;
  loginForm!: FormGroup;
  ipaddress: any;
  commonConstant: commonConstant;
  validEmail: boolean = false;
  invalidUser: boolean = false;
  invalidLogin: boolean = false;
  constructor(private router: Router,
    private customValidatorService: CustomValidatorServiceService,
    private authService: AuthServiceService,
    private dialogService: DialogService,
  ) {
    this.commonConstant = new commonConstant();
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.commonConstant.pattern.emailValidationPatternForSignIn)]),
      password: new FormControl(null, Validators.required)
    });
    this.deviceInfo = this.customValidatorService.getDeviceInfo();
    this.customValidatorService.getIp().subscribe((res: any) => {
      if (res && res.ip) this.ipaddress = res.ip;
    })
  }

  login() {
    this.invalidUser = false;
    this.invalidLogin = false;
    this.validEmail = false;
    if (this.loginForm && this.loginForm.valid) {
      let data = {
        email: this.loginForm.get('email') && this.loginForm.get('email')?.value ? this.loginForm.get('email')?.value : null,
        password: this.loginForm.get('password') && this.loginForm.get('password')?.value ? this.loginForm.get('password')?.value : null,
        ipAddress: this.ipaddress,
        browserInfo: this.deviceInfo && this.deviceInfo.browser,
        deviceName: this.deviceInfo && this.deviceInfo.deviceType,
      }
      this.customValidatorService.signin(data).subscribe((res: any) => {
        if (res && res.user && res.token && res.refreshToken) {
          this.authService.setToken(res);
          const encryptedEmail = this.authService.encrypt(this.loginForm.value.email);
          console.log('email encrypt :',typeof(encryptedEmail));
          this.router.navigate(['/app/empinfo',  encryptedEmail ] )
        }
      }
        , (err) => {
          console.log(err.error.error);
          if (err && err.error && err.error.error == "INVALID EMAIL") {
            this.validEmail = true;
          } else if (err && err.error && err.error.error == "INVALID USER") {
            this.invalidUser = true;
            console.log('invalid User : ', this.invalidUser)
          }
          else if (err && err.error && err.error.error == "INVALID LOGIN") {
            this.invalidLogin = true;
          }
          // this.dialogService.openDialog({
          //   header: 'success',
          //   message: 'cant able to signin',
          //   button: 'ok',
          //   disableClose: true,
          //   actionType: 'success'
          // })
        }
      )
    }
  }
  navigate(value: any) {
    this.router.navigate([value]);
  }

}
