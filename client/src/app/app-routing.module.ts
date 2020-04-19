import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProgramComponent } from './views/register-program/register-program.component';
import { LoginComponent } from './views/login/login.component';
import { ValidationsComponent } from './views/validations/validations.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-program', component: RegisterProgramComponent },
  { path: 'validations', component: ValidationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
