import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map,mergeMap } from 'rxjs/operators';
import { loginConstant } from '../../constant/loginConstant';
import { CustomValidatorServiceService } from '../../service/custom-validator-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isLinear = true;
  // const contactControls = ["addressLine1","addressLine2","mobileNumber","homePhoneNumber","city","country","state","zipCode"];

  stepperOrientation: Observable<StepperOrientation>;
  employeeInfo!: UntypedFormGroup;
  contactInfo!: UntypedFormGroup;
  createUser!: UntypedFormGroup;
  Countries: any;
  isLoader = true;
  subscriptionObj: Subscription = new Subscription();
  sameAddress = false;
  loginConstant: loginConstant;
  presentAddstate: any;
  permanentAddstate: any;
  emergencyContactAddstate: any;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private customValidatorService: CustomValidatorServiceService,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    this.loginConstant = new loginConstant();
  }

  ngOnInit() {
    this.route.params.pipe(filter((res:any) => {
      if(res && res.id){
        console.log('cleareddd...');
      }
        return res.id !==null;
    })).subscribe((response:any) => {
      this.userId = this.authService.decrypt(response.id);
      console.log('user Id :',this.userId);
      this.formInitialization();
    })
    this.customValidatorService.getCountry().subscribe((res: any) => {
      if (res && res.success) {
        this.Countries = res.results;
        this.isLoader = false;
      }
    }, () => {
      console.log('failed to load details..')
      this.isLoader = false;
    })
  }
  formInitialization() {
    this.employeeInfo = new UntypedFormGroup({
      fatherName: new UntypedFormControl(null, Validators.required),
      firstName: new UntypedFormControl(null, Validators.required),
      middleName: new UntypedFormControl(null, Validators.required),
      lastName: new UntypedFormControl(null, Validators.required),
      email: new UntypedFormControl(null, Validators.required),
      alternateEmail: new UntypedFormControl(null, Validators.required),
      dateOfBirth: new UntypedFormControl(null, Validators.required),
      gender: new UntypedFormControl(null, Validators.required),
      maritalStatus: new UntypedFormControl(null, Validators.required),
      work: new UntypedFormControl(null, Validators.required),
    });
    this.contactInfo = new UntypedFormGroup({
      presentAddress: new UntypedFormGroup({
        addressLine1: new UntypedFormControl(null, Validators.required),
        addressLine2: new UntypedFormControl(null, Validators.required),
        mobileNumber: new UntypedFormControl(null, Validators.required),
        homePhoneNumber: new UntypedFormControl(null, Validators.required),
        city: new UntypedFormControl(null, Validators.required),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, Validators.required),
      }),
      permanentAddress: new UntypedFormGroup({
        addressSame: new UntypedFormControl(false),
        addressLine1: new UntypedFormControl(null, Validators.required),
        addressLine2: new UntypedFormControl(null, Validators.required),
        mobileNumber: new UntypedFormControl(null, Validators.required),
        homePhoneNumber: new UntypedFormControl(null, Validators.required),
        city: new UntypedFormControl(null, Validators.required),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, Validators.required),
      }),
      emergencyContact: new UntypedFormGroup({
        contactName: new UntypedFormControl(null, Validators.required),
        relationship: new UntypedFormControl(null, Validators.required),
        addressLine1: new UntypedFormControl(null, Validators.required),
        addressLine2: new UntypedFormControl(null, Validators.required),
        mobileNumber: new UntypedFormControl(null, Validators.required),
        homePhoneNumber: new UntypedFormControl(null, Validators.required),
        city: new UntypedFormControl(null, Validators.required),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, Validators.required),
      })
    })
    this.createUser = new UntypedFormGroup({
      userId: new UntypedFormControl(this.userId ?? null,Validators.required),
      password:new UntypedFormControl(null,Validators.required),
      reenterPassword:new UntypedFormControl(null, Validators.required)
    })
  }


  getState(event: any, address: any) {
    // this.isLoader = true;
    event = { stateCode: event.value.iso2 };
    console.log('event :', event);
    this.customValidatorService.getState(event).subscribe((res: any) => {
      if (res && res.success) {
        console.log('state :', res);
        if (address == 'presentAddress') this.presentAddstate = res.results;
        if (address == 'permanentAddress') this.permanentAddstate = res.results;
        if (address == 'emergencyContact') this.emergencyContactAddstate = res.results;
        // this.isLoader = false;
      }
    }, () => {
      console.log('failed to load details..');
      // this.isLoader = false;
    })
  }

  addressType(event: any) {
    this.sameAddress = !this.sameAddress;
    const contact = this.contactInfo?.get('permanentAddress') as UntypedFormGroup;
    if (contact && this.sameAddress) {
      for (const controlName of Object.keys(contact.controls)) {
        if (controlName !== 'addressSame') {
          const control = contact?.get(controlName);
          control?.clearValidators();
        }
      }
    }
    if (contact && !this.sameAddress) {
      for (const controlName of Object.keys(contact.controls)) {
        if (controlName !== 'addressSame') {
          const control = contact?.get(controlName);
          control?.setValidators(Validators.required);
        }
      }
    }
    for (const controlName of Object.keys(contact.controls)) {
      if (controlName !== 'addressSame') {
        const control = contact?.get(controlName);
        control?.updateValueAndValidity();
      }
    }
    console.log('contact :', contact)
  }

}
