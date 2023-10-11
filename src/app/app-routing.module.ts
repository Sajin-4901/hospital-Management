import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: "", redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'signup', component: ForgotPasswordComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
