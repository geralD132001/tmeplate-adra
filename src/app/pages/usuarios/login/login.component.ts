import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../providers/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any;
  formGroup: FormGroup;
  @Output()  emisor = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.inicio();
    if(this.authService.isAuthenticated()) {
      Swal.fire("Login", `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/'])
    }
  }

  private inicio(): any {
    const controls = {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  login(): void {
    this.usuario = this.formGroup.value;
    if(this.usuario.username === '' || this.usuario.password === '') {
      Swal.fire("Error", "Usuario o contraseña vacías!", 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe( response => {
      console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      this.router.navigate(['/']);
      //location.reload();
    }, error => {
      if (error.status === 400) {
        Swal.fire('Error Login', `Usuario o clave incorrectas!`, 'error');
      }
    });
  }
}
