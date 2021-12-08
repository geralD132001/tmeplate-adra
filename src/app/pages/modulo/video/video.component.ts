import { Component, OnInit } from '@angular/core';
import {RecursoService} from "../../../providers/services/recurso.service";
import {SesionService} from "../../../providers/services/sesion.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  sesiones: any [] = [];
  recursos:any[] = [];
  capacitaciones:any[] = [];
  constructor(private recursoService: RecursoService,
              private sesionService: SesionService,
              private capacitacionService: CapacitacionService) { }

  ngOnInit(): void {
    this.getRecursos();
    this.getSesiones();
    this.getCapacitaciones();
  }
  getRecursos(): void {
    this.recursoService.getAll$().subscribe(response => {
      console.log(response);
      this.recursos = response.data || [];
    });
  }
  getCapacitaciones(): void {
    this.capacitacionService.getAll$().subscribe(response => {
      console.log(response);
      this.capacitaciones = response.data || [];
    });
  }
  getSesiones(): void {
    this.sesionService.getAll$().subscribe(response => {
      console.log(response);
      this.recursos = response.data || [];
    });
  }
}
