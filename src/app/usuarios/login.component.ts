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
  }

  login(): void {
    console.log(this.usuario);

    if (!this.usuario.username || !this.usuario.password) {
      Swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      const datosToken = JSON.parse(atob(response.access_token.split('.')[1]));
      console.log(datosToken);
      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${datosToken.user_name} has iniciado sesion con exito.`, 'success');
    });

  }

}
