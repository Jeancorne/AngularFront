import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { servicesApi } from 'src/app/services/services';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-cmp-login',
  templateUrl: './cmp-login.component.html',
  styleUrls: ['./cmp-login.component.css']
})
export class CmpLoginComponent implements OnInit {

  public _formulario = new FormGroup({
    txtUsuario: new UntypedFormControl(null, Validators.required),
    txtPassword: new UntypedFormControl(null, Validators.required),
  })
  constructor(private _services: servicesApi, 
              private _ruta: Router,
              private _cookieServices: CookieService,
              private _spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
    this._spinner.show();
    this._spinner.hide();
  }
  async ingresar() {
    try {
      this._spinner.show();
      var txtUsuario = this._formulario.value.txtUsuario;
      var txtPassword = this._formulario.value.txtPassword;
      if (txtUsuario == null || txtUsuario.trim() == "") throw "Es obligatorio el usuario";
      if (txtPassword == null || txtPassword.trim() == "") throw "Es obligatorio la contraseña";
      var json = {
        "usuario": txtUsuario,
        "password":  Md5.hashStr(txtPassword.trim())
      }      
      this._services.iniciarSesion(json).subscribe(
        (res: any) => {                    
          this._cookieServices.set('token', res.token, 1, "/");
          this._spinner.hide();
          this._ruta.navigate(['/inicio']);
        }, (ex: any) => {          
          this._spinner.hide();
          var mensajeError = ex.error != null ? ( ex.error.message != null ? (ex.error.message):("Error")):("Error")
          Swal.fire('Error', mensajeError.toString(), 'error');
        }
      )

    } catch (error: any) {
      this._spinner.hide();
      Swal.fire('Error', error.toString(), 'error');
    }

  }
}
