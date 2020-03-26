import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = false;

  private notificaUploa = new EventEmitter<any>();

  constructor() { }

  get notificaUpload(): EventEmitter<any> {
    return this.notificaUploa;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

}
