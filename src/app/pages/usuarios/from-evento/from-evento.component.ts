import { Component, OnInit } from '@angular/core';
import {EventoService} from "../../../providers/services/evento.service";

@Component({
  selector: 'app-from-evento',
  templateUrl: './from-evento.component.html',
  styleUrls: ['./from-evento.component.css']
})
export class FromEventoComponent implements OnInit {

  eventos: any []=[];

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    this.getEventos();
  }
getEventos(): void{
    this.eventoService.getAll$().subscribe(response =>{
      console.log(response);
      this.eventos=response.data || [];
    })
}
}
