import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { servicesApi } from 'src/app/services/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cmp-productos',
  templateUrl: './cmp-productos.component.html',
  styleUrls: ['./cmp-productos.component.css']
})
export class CmpProductosComponent implements OnInit {
  public _table: any = [];
  public _actualizar: boolean = false;
  public _formulario = new FormGroup({
    id: new UntypedFormControl(null),
    txtNombre: new UntypedFormControl(null, Validators.required),
    txtCantidad: new UntypedFormControl(null, Validators.required),
  })

  constructor(private _services: servicesApi,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._spinner.show();
    this.obtenerProductos();
    this._spinner.hide();
  }
  async actualizarProducto(data: any) {
    this._actualizar = true;
    this._formulario.get("id")?.setValue(data.id);
    this._formulario.get("txtCantidad")?.setValue(data.cantidadMinAlerta);
    this._formulario.get("txtNombre")?.setValue(data.nombre);
  }
  async cancelarActualizacion(){
    this._actualizar = false;
    this._formulario.reset();
  }
  async registrarProducto() {
    this._spinner.show();    
    if(this._actualizar == false){
      var json = {
        "nombre": this._formulario.value.txtNombre,
        "cantidadMinAlerta": this._formulario.value.txtCantidad
      };
      this._services.registrarProductos(json).subscribe(
        (res: any) => {
          this._table.push(res);
          this._formulario.reset();
          this._spinner.hide();
        }, (ex: any) => {
          this._spinner.hide();
          var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
          Swal.fire('Error', mensajeError.toString(), 'error');
        }
      )
    }else if(this._actualizar == true){
      var jsonData = {
        "id": this._formulario.value.id,
        "nombre": this._formulario.value.txtNombre,
        "cantidadMinAlerta": this._formulario.value.txtCantidad
      };
      this._services.actualizarProductos(jsonData).subscribe(
        (res: any) => {
          var data = this._table.filter((a: any) => a.id != res.id);
          this._actualizar = false;          
          this._table.push(res);
          this._formulario.reset();
          this._spinner.hide();
        }, (ex: any) => {
          this._spinner.hide();
          var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
          Swal.fire('Error', mensajeError.toString(), 'error');
        }
      )
    }
    
  }
  async obtenerProductos() {
    this._services.obtenerProductos().subscribe(
      (res: any) => {
        this._table = res;        
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )
  }

}
