import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [
    { id: 1, nombre: 'Cliente', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/12/20' },
    { id: 2, nombre: 'Cliente2', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/11/20' },
    { id: 3, nombre: 'Cliente3', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/10/20' },
    { id: 4, nombre: 'Cliente4', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/09/20' },
    { id: 5, nombre: 'Cliente5', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/08/20' },
    { id: 6, nombre: 'Cliente6', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/07/20' },
    { id: 7, nombre: 'Cliente7', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/06/20' },
    { id: 8, nombre: 'Cliente8', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/05/20' },
    { id: 9, nombre: 'Cliente9', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/04/20' },
    { id: 10, nombre: 'Cliente10', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/03/20' },
    { id: 11, nombre: 'Cliente11', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/02/20' },
    { id: 12, nombre: 'Cliente12', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/01/20' },
    { id: 13, nombre: 'Cliente13', apellido: 'Zenil', email: 'szenil@gmail.com', fecha: '2020/03/20' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
