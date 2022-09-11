import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { servicesApi } from 'src/app/services/services';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-cmp-inventario',
  templateUrl: './cmp-inventario.component.html',
  styleUrls: ['./cmp-inventario.component.css']
})
export class CmpInventarioComponent implements OnInit {
  public _table: any = [];
  public _datosProductos: any = [];
  formModal: any;
  public _base64textString: any = null;  
  public _nombreDocumento: string = "";
  public _actualizar: boolean = false;
  public _formulario = new FormGroup({
    id: new UntypedFormControl(null),
    cantidadEntrada: new UntypedFormControl(null, Validators.required),
    idProducto: new UntypedFormControl(null, Validators.required),
    codigo: new UntypedFormControl(null, Validators.required),
    precio: new UntypedFormControl(null, Validators.required),
    descripcion: new UntypedFormControl(null, Validators.required),
    cantidad: new UntypedFormControl(null),
  })


  constructor(private _services: servicesApi, private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this._spinner.show();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.obtenerInventarios();
    this.obtenerProductos();
    this._spinner.hide();

  }
  async obtenerProductos() {
    this._services.obtenerProductos().subscribe(
      (res: any) => {
        this._datosProductos = res;
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )
  }
  async obtenerInventarios() {
    this._services.obtenerInventario().subscribe(
      (res: any) => {
        this._table = res;
      }, (ex: any) => {
        this._spinner.hide();
        var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
        Swal.fire('Error', mensajeError.toString(), 'error');
      }
    )
  }

  modalactualizarInventario(data: any, actualizar: boolean) {
    this._actualizar = actualizar;
    if (actualizar == true) {
      //Actualizar
      this._formulario.get("id")?.setValue(data.id);
      this._formulario.get("cantidadEntrada")?.setValue(data.cantidadEntrada);
      this._formulario.get("idProducto")?.setValue(data.idProducto);
      this._formulario.get("codigo")?.setValue(data.codigo);
      this._formulario.get("descripcion")?.setValue(data.descripcion);
      this._formulario.get("cantidad")?.setValue(data.cantidad);
      this._formulario.get("precio")?.setValue(data.precio);
      this._nombreDocumento =  data.nombreDocumento;
      this._base64textString = data.documento;
    } else {
      //Crear
      this._formulario.reset();
    }
    this.formModal.show();
  }
  actualizarInventario() {    
    this._spinner.show();
    var json = {
      "id": this._actualizar == true ? ( this._formulario.value?.id):(0),
      "cantidadEntrada": this._formulario.value?.cantidadEntrada,
      "idProducto": this._formulario.value?.idProducto,
      "codigo": this._formulario.value?.codigo,
      "precio": this._formulario.value?.precio,
      "descripcion": this._formulario.value?.descripcion,
      "cantidad": this._formulario.value?.cantidad,
      "documento": this._base64textString,
      "nombreDocumento": this._nombreDocumento
    }
    if(this._actualizar == true){
      this._services.actualizarInventario(json).subscribe(
        (res: any) => {
          this._table = this._table.filter((a:any) => a.id != res.id);
          this._table.push(res);
          this._formulario.reset();
          this._spinner.hide();
          this.formModal.hide();
        }, (ex: any) => {
          this._spinner.hide();
          var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
          Swal.fire('Error', mensajeError.toString(), 'error');
        }
      )
    }else{
      this._services.registrarInventario(json).subscribe(
        (res: any) => {
          this._table.push(res);
          this._formulario.reset();
          this._spinner.hide();
          this.formModal.hide();
        }, (ex: any) => {
          this._spinner.hide();
          var mensajeError = ex.error != null ? (ex.error.message != null ? (ex.error.message) : ("Error")) : ("Error")
          Swal.fire('Error', mensajeError.toString(), 'error');
        }
      )
    } 
  }  
  async descargarArchivo(data: any){
    console.log(data);
    const downloadLink = document.createElement('a');
    const fileName = data.nombreDocumento;
    downloadLink.href = "data:image/png;base64," + data.documento;
    downloadLink.download = fileName;
    downloadLink.click();
    downloadLink.remove();
  }
  handleFileInput(event: any): void {
    try {
      var files = event.target.files;
      var file = files[0];
      var extension = file?.name.substring(file?.name.lastIndexOf(".") + 1);
      if (extension != "xlsx") throw ("Solo se permite excel");      
      if (files && file) {
        this._nombreDocumento = file.name;
        var reader = new FileReader();
        reader.onload = this.obtenerBase64.bind(this);
        reader.readAsBinaryString(file);
      }
    } catch (ex: any) {      
      Swal.fire('Error', ex.toString(), 'error');
    }    
  }
  obtenerBase64(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this._base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }



}
