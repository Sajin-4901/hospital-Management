import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { NavbarComponent } from './core/component/navbar/navbar.component';

const routes: Routes = [
  { path: "", redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'signup', component: ForgotPasswordComponent },

  { path: 'app', component: NavbarComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
