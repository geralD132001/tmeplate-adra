import { Component, OnInit } from '@angular/core';
import {BancoService} from "../../../providers/services/banco.service";
import {PersonaService} from "../../../providers/services/persona.service";
import {CapacitacionService} from "../../../providers/services/capacitacion.service";
import {SesionService} from "../../../providers/services/sesion.service";
import {UploadFilesService} from "../../../providers/services/upload-files.service";
import {RecursoService} from "../../../providers/services/recurso.service";
import {Observable} from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from "../../../providers/services/auth.service";

@Component({
  selector: 'app-from-capacitacion',
  templateUrl: './from-capacitacion.component.html',
  styleUrls: ['./from-capacitacion.component.css']
})
export class FromCapacitacionComponent implements OnInit {

  persona: any;
  capacitaciones: any[]= [];
  sesiones: any[]= [];
  recursos:any;
  bancos: any [] = [];
  selectedFiles: FileList;
  idBanco: string;
  idSesion: string;
  idRecurso: string;
  progressInfo = [];
  message = '';
  imageName = "";



  fileInfos: Observable<any>;
  constructor(private authService: AuthService,
              private bancoService: BancoService,
              private personaService: PersonaService,
              private capacitacionService: CapacitacionService,
              private sesionService: SesionService,
              private uploadFilesService: UploadFilesService,
              private recursoService: RecursoService,
              private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getBancos();
    this.getPersonas();
    this.getSesiones();
    this.getCapacitaciones();
    this.getRecursos(this.idSesion);
    this.fileInfos = this.uploadFilesService.getFiles();

  }
  getBancos(): void {
    this.bancoService.getAll$().subscribe(response => {
      console.log(response);
      this.bancos = response.data || [];
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
      this.sesiones = response.data || [];
    });
  }
  getPersonas(): void {
    this.personaService.getById$(this.authService.usuario.idPersona).subscribe(response => {
      console.log(response);
      this.persona = response.data || [];
    });
  }

  /*getRecursos(): void {
    this.recursoService.getAll$().subscribe(response => {
      console.log(response);
      this.recursos = response.data || [];
    });
  }*/
 getRecursos(idSesion: any): any {
    this.recursoService.getBySesion(idSesion).subscribe(response => {
      console.log(response);
      this.recursos = response.data || [];
    });
    return this.recursos;
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/u5TvGxd-T7c' + video);
  }

}
