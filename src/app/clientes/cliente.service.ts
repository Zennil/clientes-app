import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient, private router: Router) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`);
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
    return this.http.post(this.urlEndPoint, cliente).pipe(
      map((respuesta: any) => respuesta.cliente as Cliente),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.router.navigate(['/clientes']);
          Swal.fire('Error al intentar obtener el cliente.', e.error.mensaje, 'error');
        }
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      map((response: any) => response.cliente),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        console.log(e.error.error);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete(`${this.urlEndPoint}/${id}`).pipe(

      map((response: any) => response.cliente),

      catchError(e => {

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

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
    // .pipe(

    //   map((respuesta: any) => respuesta.cliente as Cliente),

    //   catchError(e => {
    //     console.log(e.error.mensaje);
    //     return throwError(e);
    //   })

    // );
  }

}
