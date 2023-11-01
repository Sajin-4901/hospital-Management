import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent {
  employeeInfo!: FormGroup;
  ngOnInit() {
    this.employeeInfo = new FormGroup({
      userCode: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      alternateEmail: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      maritalStatus: new FormControl(null, Validators.required),
      work: new FormControl(null, Validators.required),
    })
  }
}
