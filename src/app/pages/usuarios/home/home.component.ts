import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../providers/services/auth.service";
import {EventoService} from "../../../providers/services/evento.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eventos: any[] = [];
  capacitaciones: any[] = [];
  constructor(public authService: AuthService,
              private eventoService: EventoService,
              private capacitacionService : CapacitacionService) { }

  ngOnInit(): void {
    this.getEventos();
    this.getCapacitaciones();
  }
  getEventos(): void {
    this.eventoService.getAll$().subscribe(response => {
      console.log(response);
      this.eventos = response.data || [];
    });
  }
  getCapacitaciones(): void {
    this.capacitacionService.getAll$().subscribe(response => {
      console.log(response);
      this.capacitaciones = response.data || [];
    });
  }
}
