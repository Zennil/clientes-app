import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { formatDate, DatePipe } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAutorizationHeader() {
    const token = this.authService.token;
    if (token) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e: any): boolean {
    if (e.status === 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }

      this.router.navigate(['/login']);
      return true;
    }
    if (e.status === 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(e);
      })
    );
  }

  getClientes2(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(

      tap(response => {
        // No transforma el response al tipo de dato Cliente
        console.log('ClienteService: tap 1');
        const clientes = response as Cliente[];
        clientes.forEach(cliente => {
          // console.log(cliente.nombre);
        });
      }),

      map(response => {

        const clientes = response as Cliente[];

        return clientes.map(cliente => {

          cliente.nombre = cliente.nombre.toUpperCase();

          // Cambiar fecha con uso de formatDate()
          // cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');

          // const datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');

          return cliente;
        });

      }),

      tap(clientes => {
        console.log('ClienteService: tap 2');
        clientes.forEach(cliente => {
          // console.log(cliente.nombre);
        });
      }),
    );
  }

  // Obtiene Clientes por  numero de pagina
  getClientes(page: number): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((response: any) => {
        (response.content as Cliente[]).forEach(cliente => {
          // console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          return cliente;
        });
        return response;
      }),
      tap(response => {
        (response.content as Cliente[]).forEach(cliente => {
          // console.log(cliente.apellido);
        });
      })
    );
  }


  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, { headers: this.agregarAutorizationHeader() }).pipe(
      map((respuesta: any) => respuesta.cliente as Cliente),
      catchError(e => {

        if (e.status === 400 || this.isNoAuthorized(e)) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAutorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAuthorized(e)) {
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        Swal.fire('Error al intentar obtener el cliente.', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.agregarAutorizationHeader() }).pipe(
      map((response: any) => response.cliente),
      catchError(e => {

        if (e.status === 400 || this.isNoAuthorized(e)) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete(`${this.urlEndPoint}/${id}`, { headers: this.agregarAutorizationHeader() }).pipe(

      map((response: any) => response.cliente),

      catchError(e => {

        if (this.isNoAuthorized(e)) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })

    );
  }

  subirFoto(archivo: File, id: string): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('id', id);

    // let httpHeaders = new HttpHeaders();
    const token = this.authService.token;

    const httpHeaders = token ? new HttpHeaders({ Authorization: 'Bearer ' + token }) : new HttpHeaders();

    // if (token) {
    //   httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    // }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAuthorized(e);
        return throwError(e);
      })
    );
    // .pipe(

    //   map((respuesta: any) => respuesta.cliente as Cliente),

    //   catchError(e => {
    //     console.log(e.error.mensaje);
    //     return throwError(e);
    //   })

    // );
  }

}
