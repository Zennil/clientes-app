import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSelected: Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      let page: number = +params.get('page');

      page = page ? page : 0;

      this.clienteService.getClientes(page).pipe(
        tap(result => {
          console.log('ClienteService: tap 3');
          (result.content as Cliente[]).forEach(cliente => {
            // console.log(cliente.apellido);
          });
        })
      ).subscribe(resp => {
        this.clientes = resp.content;
        this.paginador = resp;
      });

    });

    this.modalService.notificaUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOrigin => {
        if (cliente.id === clienteOrigin.id) {
          clienteOrigin.foto = cliente.foto;
        }
        return clienteOrigin;
      });
    });

  }

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(respuesta => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con exito.`, 'success');
        });
      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSelected = cliente;
    this.modalService.abrirModal();
  }

}
