import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal, { } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Inicia Sesion';
  usuario: Usuario;


  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login(): void {
    console.log(this.usuario);
    if (!this.usuario.username || !this.usuario.password) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
  }

}
