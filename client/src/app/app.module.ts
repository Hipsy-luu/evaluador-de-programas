import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Enable Biding
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Importacion de las vistas/componentes
import { RegisterProgramComponent } from './views/register-program/register-program.component';
import { LoginComponent } from './views/login/login.component';
import { ValidationsComponent } from './views/validations/validations.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterProgramComponent,
    LoginComponent,
    ValidationsComponent,
    AdminDashboardComponent,
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
