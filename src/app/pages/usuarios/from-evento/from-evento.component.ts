import { Component, OnInit } from '@angular/core';
import {EventoService} from "../../../providers/services/evento.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-from-evento',
  templateUrl: './from-evento.component.html',
  styleUrls: ['./from-evento.component.css']
})
export class FromEventoComponent implements OnInit {

  idEvento: any = this.activatedRoute.snapshot.paramMap.get('id_vento');
  evento: any ;
  eventos: any[] = [];
  constructor(private eventoService: EventoService,
              private _sanitizer: DomSanitizer,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getEventos();
    this.getEvento();
  }

  getEvento(): void {
    this.eventoService.getById$(this.idEvento).subscribe(response => {
      // console.log(response);
      this.evento = response.data || [];
    });
  }
  getEventos(): void {
    this.eventoService.getAll$().subscribe(response => {
      console.log(response);
      this.eventos = response.data || [];
    });
  }


  getVideoIframe(url) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }



}
