import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { NavbarComponent } from './component/navbar/navbar.component';



@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, DialogComponent, NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CoreModule { }
