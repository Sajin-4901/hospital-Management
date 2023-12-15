import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { NavbarComponent } from './core/component/navbar/navbar.component';
import { EmployeeInfoComponent } from './end-user/components/employee-info/employee-info.component';
import { EmpListComponent } from './end-user/emp-list/emp-list.component';
import { SignupComponent } from './core/component/signup/signup.component';

const routes: Routes = [
  { path: "", redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'signup', component: ForgotPasswordComponent },
  { path: 'signupform/:id', component: SignupComponent },

  {
    path: 'app', component: NavbarComponent, children: [
      { path: 'empinfo', component: EmployeeInfoComponent },
      { path: 'emplist', component: EmpListComponent }
    ]
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
