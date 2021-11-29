import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  test : Date = new Date();
  public isCollapsed = true;
  autorizado: boolean;
  auth: any;
  focus: any;
  focus1: any;
  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.autorizado = this.authService.isAuthenticated();
    this.auth = this.authService;
  }
  getPath(){
    return this.router.url;
  }

  logout(): void {
    // let username = this.authService.usuario.username;
    Swal.fire('Logout', `Hola ${this.auth.usuario.username}, has cerrado sesión con éxito!`, 'success');
    this.authService.logout();
    //this.autorizado = false;
    //this.auth = [];
    location.reload();
    //this.router.navigate(['**']);
  }
}
