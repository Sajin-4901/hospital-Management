import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    EmployeeInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EndUserModule { }
