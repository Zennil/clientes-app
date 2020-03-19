import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private titulo = 'Crear cliente';
  private cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
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
