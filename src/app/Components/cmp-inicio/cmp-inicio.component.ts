import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cmp-inicio',
  templateUrl: './cmp-inicio.component.html',
  styleUrls: ['./cmp-inicio.component.css']
})
export class CmpInicioComponent implements OnInit {

  constructor(
    private _cookie: CookieService,
    private _ruta: Router,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
  }


  async cerrarSesion(){    
    console.log();
    this._cookie.delete("token");    
    this._ruta.navigate(['login'])

  }
}
