import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'https://portafolio-26c79.firebaseio.com';
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) {
    console.log('Servicio productos');
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get(`${this.url}/productos_idx.json`).subscribe( (resp: Producto[]) => {
        /* console.log(resp); */
        this.cargando = false;
        this.productos = resp;
        resolve();
      });
    });
  }

  getProducto( id: string ) {
    return this.http.get(`${this.url}/productos/${id}.json`);
  }

  buscarProducto( termino: string ) {

    if (this.productos.length === 0) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProducto(termino);
      });
    } else {
      // Aplicar filtro
      this.filtrarProducto(termino);
    }

  }

  private filtrarProducto( termino: string ) {
    this.productoFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productoFiltrado.push(prod);
      }
    });

  }
}
