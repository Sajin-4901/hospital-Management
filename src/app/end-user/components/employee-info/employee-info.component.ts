import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { enduserconstant } from '../../constant/enduserconstant';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent {
  selectedTemplate !: TemplateRef<any>;
  hoveredIndex = 0;
  dashboardCategory!: any[];
  employeeInfo!: FormGroup;
  contactInfo!: FormGroup;
  enduserconstant: enduserconstant;
  @ViewChild('GENERALINFO', { static: true }) GENERALINFO !: TemplateRef<any>;
  @ViewChild('CONTACT', { static: true }) CONTACT !: TemplateRef<any>;
  @ViewChild('INSURANCEINFO', { static: true }) INSURANCEINFO !: TemplateRef<any>;
  @ViewChild('MEDIHISTORY', { static: true }) MEDIHISTORY !: TemplateRef<any>;
  constructor() {
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
    this.formInitialization();
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
}
