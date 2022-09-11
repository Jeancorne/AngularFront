import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CmpInicioComponent } from './Components/cmp-inicio/cmp-inicio.component';
import { CmpInventarioComponent } from './Components/cmp-inventario/cmp-inventario.component';
import { CmpProductosComponent } from './Components/cmp-productos/cmp-productos.component';
import { CmpUsuariosComponent } from './Components/cmp-usuarios/cmp-usuarios.component';
import { CmpCrearUsuarioComponent } from './Components/login/cmp-crear-usuario/cmp-crear-usuario.component';
import { CmpLoginComponent } from './Components/login/cmp-login/cmp-login.component';
import { AuthGuard, guardLogin } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    pathMatch: 'full',
    component: CmpLoginComponent,    
    canActivate: [guardLogin],
  },
  { 
    path: 'crearusuario', 
    pathMatch: 'full',
    component: CmpCrearUsuarioComponent,    
  },  
  {
    path: 'inicio',
    component: CmpInicioComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inventario',
        component: CmpInventarioComponent, 
      },
      {
        path: 'productos',
        component: CmpProductosComponent 
      },
      {
        path: 'usuarios',
        component: CmpUsuariosComponent 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxSpinnerModule.forRoot()],
  exports: [RouterModule, NgxSpinnerModule]
})
export class AppRoutingModule { }
