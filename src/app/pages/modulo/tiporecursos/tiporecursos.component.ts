import { Component, OnInit } from '@angular/core';
import {TiporecursoService} from "../../../providers/services/tiporecurso.service";

@Component({
  selector: 'app-tiporecursos',
  templateUrl: './tiporecursos.component.html',
  styleUrls: ['./tiporecursos.component.css']
})
export class TiporecursosComponent implements OnInit {

  tiposRecursos: any[] = [];
  constructor(private tipoRecursoservice: TiporecursoService) { }

  ngOnInit(): void {
    this.getTiporecursos();
  }
  getTiporecursos(): void {
    this.tipoRecursoservice.getAll$().subscribe(response => {
      console.log(response);
      this.tiposRecursos = response.data || [];
    });
  }
}
