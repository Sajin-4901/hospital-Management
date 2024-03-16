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
import { commonConstant } from '../../constant/commonConstant';
import { validateBasis } from 'ngx-flexible-layout';
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
  signupData:any = {};
  Countries: any;
  errorMessages:any;
  isLoader = true;
  subscriptionObj: Subscription = new Subscription();
  sameAddress = false;
  loginConstant: loginConstant;
  presentAddstate: any;
  currentDate = new Date();
  permanentAddstate: any;
  emergencyContactAddstate: any;
  commonConstant:commonConstant;
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
    this.commonConstant = new commonConstant();
  }

  ngOnInit() {
    this.errorMessages = this.loginConstant.errorMessage;
    this.route.params.pipe(filter((res:any) => {
      if(res && res.id){
        console.log('cleareddd...',res.id);
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
      fatherName: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
      firstName: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
      middleName: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
      lastName: new UntypedFormControl(null),
      email: new UntypedFormControl(null, [ Validators.required ,Validators.email]),
      alternateEmail: new UntypedFormControl(null),
      dateOfBirth: new UntypedFormControl(null, Validators.required),
      gender: new UntypedFormControl(null, Validators.required),
      maritalStatus: new UntypedFormControl(null, Validators.required),
      work: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
    });
    this.contactInfo = new UntypedFormGroup({
      presentAddress: new UntypedFormGroup({
        addressLine1: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        addressLine2: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        mobileNumber: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern),Validators.maxLength(10)]),
        homePhoneNumber: new UntypedFormControl(null,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern)),
        city: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.zipcodeValidationPattern)]),
      }),
      permanentAddress: new UntypedFormGroup({
        addressSame: new UntypedFormControl(false),
        addressLine1: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        addressLine2: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        mobileNumber: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern),Validators.maxLength(10)]),
        homePhoneNumber: new UntypedFormControl(null,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern)),
        city: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.zipcodeValidationPattern)]),
      }),
      emergencyContact: new UntypedFormGroup({
        contactName: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets)]),
        relationship: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets)]),
        addressLine1: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        addressLine2: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]),
        mobileNumber: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern),Validators.maxLength(100)]),
        homePhoneNumber: new UntypedFormControl(null,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern)),
        city: new UntypedFormControl(null,[ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]),
        country: new UntypedFormControl(null, Validators.required),
        state: new UntypedFormControl(null, Validators.required),
        zipCode: new UntypedFormControl(null, [ Validators.required ,Validators.pattern(this.commonConstant.pattern.zipcodeValidationPattern)]),

     })
    })
    this.createUser = new UntypedFormGroup({
      email: new UntypedFormControl(this.userId ?? null,[ Validators.required ,Validators.email]),
      password:new UntypedFormControl(null,[Validators.required,Validators.pattern(this.commonConstant.pattern.passwordValidationPattern)]),
      reenterPassword:new UntypedFormControl(null, [Validators.required,Validators.pattern(this.commonConstant.pattern.passwordValidationPattern)])
    })
    console.log('form :',this.employeeInfo);
  }


  getState(event: any, address: any) {
    // this.isLoader = true;
    // let sc 
    // console.log('event1 :',event);
    // event = { stateCode: event.value.iso2 };
    // console.log('event :', event);
    // if (address == 'presentAddress'){
    //   sc = this.contactInfo?.get('presentAddress')?.get('country')?.value;
    // }
    this.customValidatorService.getState( { stateCode: event.value }).subscribe((res: any) => {
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
      // for (const controlName of Object.keys(contact.controls)) {
      //   if (controlName !== 'addressSame') {
      //     const control = contact?.get(controlName);
      //     control?.setValidators(Validators.required);
      //   }
      // }
      contact.get('addressLine1')?.setValidators([ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]);
      contact.get('addressLine2')?.setValidators([ Validators.required ,Validators.pattern(this.commonConstant.pattern.addressValidationPattern),Validators.maxLength(100)]);
      contact.get('mobileNumber')?.setValidators([ Validators.required ,Validators.pattern(this.commonConstant.pattern.phoneNumberPattern),Validators.maxLength(10)]);
      contact.get('homePhoneNumber')?.setValidators(Validators.pattern(this.commonConstant.pattern.phoneNumberPattern));
      contact.get('city')?.setValidators([ Validators.required ,Validators.pattern(this.commonConstant.pattern.acceptOnlyAlphabets),Validators.maxLength(100)]);
      contact.get('country')?.setValidators(Validators.required);
      contact.get('state')?.setValidators(Validators.required);
      contact.get('zipCode')?.setValidators([ Validators.required ,Validators.pattern(this.commonConstant.pattern.zipcodeValidationPattern)]);
       }
    for (const controlName of Object.keys(contact.controls)) {
      if (controlName !== 'addressSame') {
        const control = contact?.get(controlName);
        control?.updateValueAndValidity();
      }
    }
    console.log('contact :', contact)
  }

  onSignup(){
    // if(this.employeeInfo?.valid && this.contactInfo?.valid && this.createUser?.valid && (this.createUser.value.password == this.createUser.value.reenterPassword)){
      
    // }
    this.signupData['employeeInfo'] = this.employeeInfo?.value;
    this.signupData['contactInfo'] = this.contactInfo?.value;
    this.signupData['createUser'] = this.createUser?.value;
    console.log('this.signupdata : ',this.signupData);
    this.customValidatorService.signupRegistration(this.signupData).subscribe((res:any) => {
      console.log('response :',res);
    })

  }

}
