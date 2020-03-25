import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo = 'Detalle del cliente';
  cliente: Cliente;

  private imgSelected: File;

  progreso = 0;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event: any) {
    this.imgSelected = event.target.files[0];
    this.progreso = 0;
    console.log(this.imgSelected);

    if (this.imgSelected.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccinado debe ser de tipo imagen', 'error');
      this.imgSelected = null;
    }
  }

  subirFoto() {

    if (!this.imgSelected) {
      Swal.fire('Error', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.imgSelected, this.cliente.id.toString())
        .subscribe(httpEvent => {
          if (httpEvent.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((httpEvent.loaded / httpEvent.total) * 100);
          } else if (httpEvent.type === HttpEventType.Response) {
            const response: any = httpEvent.body;
            this.cliente = response.cliente as Cliente;
            Swal.fire('Listo!', response.mensaje, 'success');
          }
        }
        );
    }
  }
}
