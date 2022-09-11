import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class servicesApi {
    url: string;
    logeado = false;
    hasBeenModified = false;

    constructor(private http: HttpClient,
        private cookies: CookieService) {
        this.url = environment.url;
    }
    //============================================================
    //=========================================== USUARIOS
    //============================================================
    crearUsuario(objetoUsuario: any) {
        return this.http.post(this.url + "servicio/crearUsuario", objetoUsuario);
    }
    actualizarUsuarios(data: any) {
        var token = this.cookies.get("token");
        return this.http.put(this.url + "servicio/actualizarUsuario", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
    obtenerUsuarios() {
        var token = this.cookies.get("token");
        return this.http.get(this.url + "servicio/obtenerUsuarios",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
    iniciarSesion(objetoUsuario: any) {
        return this.http.post(this.url + "servicio/login", objetoUsuario);
    }

    //============================================================
    //=========================================== PRODUCTOS
    //============================================================
    obtenerProductos() {
        var token = this.cookies.get("token");
        return this.http.get(this.url + "servicio/obtenerProductos",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    registrarProductos(data: any) {
        var token = this.cookies.get("token");
        return this.http.post(this.url + "servicio/crearProducto", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    actualizarProductos(data: any) {
        var token = this.cookies.get("token");
        return this.http.put(this.url + "servicio/actualizarProducto", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    //============================================================
    //=========================================== INVENTARIOS
    //============================================================
    obtenerInventario() {
        var token = this.cookies.get("token");
        return this.http.get(this.url + "servicio/obtenerInventarios",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
    registrarInventario(data: any) {
        var token = this.cookies.get("token");
        return this.http.post(this.url + "servicio/crearInventario", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
    actualizarInventario(data: any) {
        var token = this.cookies.get("token");
        return this.http.put(this.url + "servicio/actualizarInventario", data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }
}  