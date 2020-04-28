import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  paginas: number[];

  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit() {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    const paginadorActualizado = changes.paginador;
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - (this.desde - 1)).fill(0).map((valor, idx) => idx + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, idx) => idx + 1);
    }
  }

}
