import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { MaterialModule } from '../material/material.module';
import { EmpListComponent } from './emp-list/emp-list.component';



@NgModule({
  declarations: [
    EmployeeInfoComponent,
    EmpListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EndUserModule { }
