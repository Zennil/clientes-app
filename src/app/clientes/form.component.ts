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
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }

  create(): void {
    console.log('Clicked');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(reponse => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${reponse.nombre} creado con exito.`, 'success');
    });
  }

}
