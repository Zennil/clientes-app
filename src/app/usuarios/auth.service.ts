import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line: variable-name
  private _usuario: Usuario;
  // tslint:disable-next-line: variable-name
  private _token: string;

  constructor(private httpClient: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario) {
      return this._usuario;
    } else if (sessionStorage.getItem('usuario')) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }

    return new Usuario();
  }

  public get token(): string {
    if (this._token) {
      return this._token;
    } else if (sessionStorage.getItem('token')) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('aungularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales
    });

    let params = new HttpParams();

    params = params.append('username', usuario.username);
    params = params.append('password', usuario.password);
    params = params.append('grant_type', 'password');

    return this.httpClient.post<any>(`${urlEndPoint}`, params, { headers: httpHeaders });
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.getDataPayload(accessToken);

    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accesToken: string): void {
    this._token = accesToken;

    sessionStorage.setItem('token', accesToken);
  }

  getDataPayload(accessToken: string): any {

    if (accessToken) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {

    const payload = this.getDataPayload(this.token);

    if (payload && payload.user_name && payload.user_name.length > 0) {
      return true;
    }

    return false;

  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();

    // por si no se quiere eliminar todos los datos del sessionStorage
    // sessionStorage.removeItem('usuario');
    // sessionStorage.removeItem('token');
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
