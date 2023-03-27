import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  
    //Busca en el HTML un elemento que tenga una referencia local igual al que determinamos entre los parentesis
    //y lo va a asignar al elemento declarado
    @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService){

    }

    buscar(){
      const valor = this.txtBuscar.nativeElement.value;
      if(valor.trim().length === 0)
        return;
      
      this.gifsService.buscarGifs(valor);

      this.txtBuscar.nativeElement.value = '';
    }
    

}
