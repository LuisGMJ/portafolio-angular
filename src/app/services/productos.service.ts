import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'https://portafolio-26c79.firebaseio.com/productos_idx.json';
  productos: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) {
    console.log('Servicio productos');
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get(`${this.url}`).subscribe( (resp: Producto[]) => {
      console.log(resp);
      this.cargando = false;
      this.productos = resp;
    });
  }
}
