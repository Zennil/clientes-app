import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: 'Detalle del cliente';
  cliente: Cliente;

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

}
