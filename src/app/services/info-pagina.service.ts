import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  url = 'https://portafolio-26c79.firebaseio.com/equipo.json';

  equipo: any[] = [];

  constructor( private http: HttpClient ) {
    console.log('Servicio info pagina cargado');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer archivo Json
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        console.log(resp);
      } );
  }

  private cargarEquipo() {
    this.http.get(`${this.url}`).subscribe( (resp: any[]) => {
      this.equipo = resp;
      console.log(resp);
    });
  }
}
