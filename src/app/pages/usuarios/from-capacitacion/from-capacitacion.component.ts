import { Component, OnInit } from '@angular/core';
import {BancoService} from "../../../providers/services/banco.service";
import {PersonaService} from "../../../providers/services/persona.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";
import {SesionService} from "../../../providers/services/sesion.service";
import {RecursoService} from "../../../providers/services/recurso.service";
import {Observable} from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from "../../../providers/services/auth.service";
import {ActivatedRoute} from '@angular/router';
import {SociaService} from "../../../providers/services/socia.service";

@Component({
  selector: 'app-from-capacitacion',
  templateUrl: './from-capacitacion.component.html',
  styleUrls: ['./from-capacitacion.component.css']
})
export class FromCapacitacionComponent implements OnInit {

  idCapacitacion: any = this.activatedRoute.snapshot.paramMap.get('id_capacitacion');

  persona: any;
  banco: any;
  capacitacion: any;
  sesiones: any[]= [];

  selectedFiles: FileList;
  progressInfo = [];
  message = '';
  imageName = "";



  fileInfos: Observable<any>;
  constructor(private authService: AuthService,
              private bancoService: BancoService,
              private personaService: PersonaService,
              private capacitacionService: CapacitacionService,
              private sesionService: SesionService,
              private recursoService: RecursoService,
              private _sanitizer: DomSanitizer,
              private activatedRoute : ActivatedRoute,
              private sociaService: SociaService) { }

  ngOnInit(): void {
    console.log(this.idCapacitacion)
    console.log(this.sesiones);
    console.log(this.banco);
    this.getPersonas();
    this.getCapacitacion();
    this.getBanco();

    this.fileInfos = this.recursoService.getFiles();

  }

  getPersonas(): void {
    this.personaService.getById$(this.authService.usuario.idPersona).subscribe(response => {
      // console.log(response);   this.idCapacitacion
      this.persona = response.data || [];
    });
  }

  getBanco(): void {
    this.bancoService.getById$(this.authService.usuario.idPersona).subscribe(response => {
      this.banco = response.data || [];
    });
  }


  getCapacitacion(): void {
    this.capacitacionService.getById$(this.idCapacitacion).subscribe(response => {
      // console.log(response);
      this.capacitacion = response.data || [];
    }, () => {}, () => {
      this.getSesiones(this.idCapacitacion);
    });
  }


  getSesiones(idCapacitacion: any): any {
    this.sesionService.getByCapacitacion(idCapacitacion).subscribe(response => {
      this.sesiones = response.data || [];
    });
  }


  calificar(item){
    console.log(item);
  }



}
