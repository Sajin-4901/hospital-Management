import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';

const routes: Routes = [
  { path: "", redirectTo: '/app', pathMatch: 'full' },
  { path: 'app', component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
