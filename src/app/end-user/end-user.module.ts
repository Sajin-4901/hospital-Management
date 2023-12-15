import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { MaterialModule } from '../material/material.module';
import { EmpListComponent } from './emp-list/emp-list.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    EmployeeInfoComponent,
    EmpListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule
  ]
})
export class EndUserModule { }
