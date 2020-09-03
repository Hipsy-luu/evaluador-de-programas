import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Habilitando Biding
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Importación de Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Importación de las vistas/componentes
import { RegisterProgramComponent } from './views/register-program/register-program.component';
import { LoginComponent } from './views/login/login.component';
import { ValidationsComponent } from './views/validations/validations.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { GlosaryComponent } from './views/glosary/glosary.component';
import { ConceptsBasisRightsComponent } from './views/concepts-basis-rights/concepts-basis-rights.component';
import { UserAcuseComponent } from './views/user-acuse/user-acuse.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterProgramComponent,
    LoginComponent,
    ValidationsComponent,
    AdminDashboardComponent,
    GlosaryComponent,
    ConceptsBasisRightsComponent,
    UserAcuseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
