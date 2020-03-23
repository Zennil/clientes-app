import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private titulo = 'Crear cliente';
  private cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.route.params.subscribe(parametros => {
      const id = parametros.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          console.log(cliente);
          this.cliente = cliente;
        });
      }
    });
  }

  create(): void {
    console.log('Clicked');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(clienteNew => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${clienteNew.nombre} creado con exito.`, 'success');
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(clienteUpd => {
      this.router.navigate(['/clientes']);
      Swal.fire('Cliente actualizado', `Cliente ${clienteUpd.nombre} actualizado con exito.`, 'success');
    });
  }

}
