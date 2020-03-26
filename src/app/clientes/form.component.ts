import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private titulo = 'Crear cliente';
  private cliente: Cliente = new Cliente();
  regiones: Region[] = [];

  private errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(parametros => {
      const id = parametros.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
      }
    });

    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);

  }

  create(): void {
    console.log('Clicked');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(clienteNew => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo cliente', `Cliente ${clienteNew.nombre} creado con exito.`, 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error: ' + err.status);
        console.log(this.errores);
      });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(clienteUpd => {
      this.router.navigate(['/clientes']);
      Swal.fire('Cliente actualizado', `Cliente ${clienteUpd.nombre} actualizado con exito.`, 'success');
    },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error: ' + err.status);
        console.log(err.error.errors);
      });
  }

  compararRegion(obj1: Region, obj2: Region): boolean {
    return !obj1 || !obj2 ? false : obj1.id === obj2.id;
  }

}
