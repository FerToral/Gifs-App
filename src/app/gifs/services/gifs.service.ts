import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'jYdlpR7691S1qtxuqGBijYJrTEAOppE8';
  private servicioUrl    : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){

    return [...this._historial];
  }

  constructor(private http: HttpClient){
    //El servicio se ejecuta al principio despues del refresh en toda la app-web

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string = ''){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
     
    }
    //modulo propio de angular para manejar el http

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit','10')
        .set('q',query);
    
    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search?`,{params})
      .subscribe((resp) => {  // el subscribe se va a ejecutar cuando recibamos algo por el get, o sea, recibamos la respuesta
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      })

    /** estas peticiones http son o retornan observables, al retornalos uno puede añadir funcionalidades a la hora de hacer la peticion
        puedo por ejemplo: mapear la respuesta, puedo concatenar, puedo hacer muchas manipulaciones en está petición
    **/
    
    /**fetch('https://api.giphy.com/v1/gifs/search?api_key=jYdlpR7691S1qtxuqGBijYJrTEAOppE8&q=dragon ball z')
      .then(resp => {
        resp.json().then(data => console.log(data))
      })
      **/

  }

}
