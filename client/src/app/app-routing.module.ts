import { ConceptsBasisRightsComponent } from './views/concepts-basis-rights/concepts-basis-rights.component';
import { GlosaryComponent } from './views/glosary/glosary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProgramComponent } from './views/register-program/register-program.component';
import { LoginComponent } from './views/login/login.component';
import { ValidationsComponent } from './views/validations/validations.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-program', component: RegisterProgramComponent },
  { path: 'validations', component: ValidationsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'glosary', component: GlosaryComponent },
  { path: 'concepts-basis-rights', component: ConceptsBasisRightsComponent },
  //Redireccionamiento en caso de que no exista la ruta
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
