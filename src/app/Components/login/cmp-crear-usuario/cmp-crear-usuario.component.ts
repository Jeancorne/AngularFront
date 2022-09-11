import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { servicesApi } from 'src/app/services/services';
import Swal from 'sweetalert2'
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-cmp-crear-usuario',
  templateUrl: './cmp-crear-usuario.component.html',
  styleUrls: ['./cmp-crear-usuario.component.css']
})

export class CmpCrearUsuarioComponent implements OnInit {
  public _formulario = new FormGroup({
    txtNombre: new UntypedFormControl(null, Validators.required),
    txtApellido: new UntypedFormControl(null, Validators.required),
    txtCorreo: new UntypedFormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    txtUsuario: new UntypedFormControl(null, Validators.required),
    txtPassword: new UntypedFormControl(null, Validators.required),
  })

  constructor(private services: servicesApi,
              private _ruta: Router,
              private _spinner: NgxSpinnerService ) { }

  ngOnInit(): void {
  }
  async crearUsuario() {
    this._spinner.show();
    var json = {
      "nombre": this._formulario.value.txtNombre,
      "apellido": this._formulario.value.txtApellido,
      "correo": this._formulario.value.txtCorreo,
      "usuario": this._formulario.value.txtUsuario,
      "password": Md5.hashStr(this._formulario.value.txtPassword.trim())
    }
    this.services.crearUsuario(json).subscribe(
      (res: any) => {
          
        Swal.fire('Registrado', "", 'success');
        this._spinner.hide();
        this._ruta.navigate(['/login']);
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? ( ex.error.message != null ? (ex.error.message):("Error")):("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )   
  }

}
