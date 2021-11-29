import { Component, OnInit } from '@angular/core';
import {AuthService} from "../providers/services/auth.service";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log("Usuario: ...", this.authService.usuario.length);
  }

}
