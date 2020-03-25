import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo = 'Detalle del cliente';
  cliente: Cliente;

  private imgSelected: File;

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
    console.log(this.imgSelected);
  }

  subirFoto() {
    this.clienteService.subirFoto(this.imgSelected, this.cliente.id.toString()).subscribe(cliente => {
      this.cliente = cliente;
      Swal.fire('Listo!', `La foto se ha cargado exitosamente: ${cliente.foto}`, 'success');
    }
    );
  }
}
