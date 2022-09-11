import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { servicesApi } from 'src/app/services/services';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-cmp-usuarios',
  templateUrl: './cmp-usuarios.component.html',
  styleUrls: ['./cmp-usuarios.component.css']
})

export class CmpUsuariosComponent implements OnInit {
  public _table: any = [];
  public _actualizar: boolean = false;
  public _formulario = new FormGroup({
    id: new UntypedFormControl(null),
    txtNombre: new UntypedFormControl(null, Validators.required),
    txtApellido: new UntypedFormControl(null, Validators.required),
    txtCorreo: new UntypedFormControl(null, Validators.required),
    Activo: new UntypedFormControl(null, Validators.required),
    txtUsuario: new UntypedFormControl(null, Validators.required),
  })
  formModal: any;
  constructor(private _services: servicesApi,
              private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._spinner.show();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );    
    this.obtenerUsuarios();    
    this._spinner.hide();
  }
  
  openModal(data: any) {        
    this._formulario.get("id")?.setValue(data.id);
    this._formulario.get("txtNombre")?.setValue(data.nombre);
    this._formulario.get("txtApellido")?.setValue(data.apellido);
    this._formulario.get("txtCorreo")?.setValue(data.correo);
    this._formulario.get("Activo")?.setValue(data.activo);
    this._formulario.get("txtUsuario")?.setValue(data.usuario);
    this.formModal.show();    
  }

  async obtenerUsuarios() {

    this._services.obtenerUsuarios().subscribe(
      (res: any) => {
        this._table = res;        
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )
  }


  closeResult: string = '';
  
  actualizarUsuario() {
    var json = {
      "id" :  this._formulario.value.id,
      "nombre" :  this._formulario.value.txtNombre,
      "apellido" :  this._formulario.value.txtApellido,
      "correo" :  this._formulario.value.txtCorreo,
      "usuario" :  this._formulario.value.txtUsuario,
      "activo" :  this._formulario.value.Activo
    }
    this._services.actualizarUsuarios(json).subscribe(
      (res: any) => {
        this._table = this._table.filter((a:any) => a.id != res.id);
        this._table.push(res);
        this._spinner.hide();
        this.formModal.hide();
        this._formulario.reset();        
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )   
  }


}


