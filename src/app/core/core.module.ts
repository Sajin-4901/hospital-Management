import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './component/login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CoreModule { }
