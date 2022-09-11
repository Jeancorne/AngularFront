
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { servicesApi } from './services/services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CmpLoginComponent } from './Components/login/cmp-login/cmp-login.component';
import { CmpCrearUsuarioComponent } from './Components/login/cmp-crear-usuario/cmp-crear-usuario.component';

import { CookieService } from 'ngx-cookie-service';
import { CmpInicioComponent } from './Components/cmp-inicio/cmp-inicio.component';
import { CmpInventarioComponent } from './Components/cmp-inventario/cmp-inventario.component';
import { CmpProductosComponent } from './Components/cmp-productos/cmp-productos.component';
import { CmpUsuariosComponent } from './Components/cmp-usuarios/cmp-usuarios.component';


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";

Component
@NgModule({
  declarations: [
    AppComponent,        
    CmpLoginComponent,
    CmpCrearUsuarioComponent,
    CmpInicioComponent,
    CmpInventarioComponent,
    CmpProductosComponent,
    CmpUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule
    
  ],
  
  providers: [servicesApi, CookieService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
