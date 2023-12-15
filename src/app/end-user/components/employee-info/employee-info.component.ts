import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { enduserconstant } from '../../constant/enduserconstant';
import { CustomValidatorServiceService } from 'src/app/core/service/custom-validator-service.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent {
  isLoader = true;

  selectedTemplate !: TemplateRef<any>;
  hoveredIndex = 0;
  dashboardCategory!: any[];
  employeeInfo!: FormGroup;
  Countries: any;
  presentAddstate: any;
  permanentAddstate: any;
  emergencyContactAddstate: any;
  contactInfo!: FormGroup;
  enduserconstant: enduserconstant;
  @ViewChild('GENERALINFO', { static: true }) GENERALINFO !: TemplateRef<any>;
  @ViewChild('CONTACT', { static: true }) CONTACT !: TemplateRef<any>;
  @ViewChild('INSURANCEINFO', { static: true }) INSURANCEINFO !: TemplateRef<any>;
  @ViewChild('MEDIHISTORY', { static: true }) MEDIHISTORY !: TemplateRef<any>;
  constructor(private customValidatorService: CustomValidatorServiceService,) {
    this.enduserconstant = new enduserconstant();
  }
  ngOnInit() {
    this.dashboardCategory = [
      { name: 'General Info', template: this.GENERALINFO },
      { name: 'Contact', template: this.CONTACT },
      { name: 'Insurance Info', template: this.INSURANCEINFO },
      { name: 'Medical History', template: this.MEDIHISTORY },
    ]
    this.selectedTemplate = this.dashboardCategory[this.hoveredIndex]?.template;
    console.log('isLoader ', this.isLoader);
    this.formInitialization();
    this.customValidatorService.getCountry().subscribe((res: any) => {
      if (res && res.success) {
        console.log('country :', res);
        this.Countries = res.results;
        this.isLoader = false;
      }
    }, () => {
      console.log('failed to load details..')
      this.isLoader = false;
    })

  }
  formInitialization() {
    this.employeeInfo = new FormGroup({
      userCode: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      alternateEmail: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      maritalStatus: new FormControl(null, Validators.required),
      work: new FormControl(null, Validators.required),
    });

    this.contactInfo = new FormGroup({
      presentAddress: new FormGroup({
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null, Validators.required),
        mobileNumber: new FormControl(null, Validators.required),
        homePhoneNumber: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        zipCode: new FormControl(null, Validators.required),
      }),

      permanentAddress: new FormGroup({
        addressSane: new FormControl(false, Validators.required),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null, Validators.required),
        mobileNumber: new FormControl(null, Validators.required),
        homePhoneNumber: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        zipCode: new FormControl(null, Validators.required),
      }),
      emergencyContact: new FormGroup({
        contactName: new FormControl(null, Validators.required),
        relationship: new FormControl(null, Validators.required),
        addressLine1: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null, Validators.required),
        mobileNumber: new FormControl(null, Validators.required),
        homePhoneNumber: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        zipCode: new FormControl(null, Validators.required),
      })
    })
  }
  templateSelection(id: any) {
    this.hoveredIndex = id;
    this.selectedTemplate = this.dashboardCategory[this.hoveredIndex]?.template;
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
}

