import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal, { } from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Inicia Sesion';
  usuario: Usuario;


  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);

    if (!this.usuario.username || !this.usuario.password) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      const usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${usuario.username} has iniciado sesion con exito.`, 'success');
    }, err => {
      if (err.status === 400) {
        Swal.fire('Error al iniciar sesion', 'El usuario o la clave incorrectas', 'error');
      }

    });

  }

}
