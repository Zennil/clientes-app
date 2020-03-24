import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() paginador: any;
  get paginas() {
    return new Array(this.paginador.totalPages).fill(0).map((valor, idx) => idx + 1);
  }

  constructor() { }

  ngOnInit() {
  }

}
