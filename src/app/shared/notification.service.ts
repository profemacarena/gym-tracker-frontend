
import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      position: { x: 'center', y: 'bottom' },
      types: [
        {
          type: 'warning',
          background: 'orange',
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'warning'
          }
        },
        {
          type: 'info',
          background: 'blue',
          icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'info'
          }
        }
      ]
    });
  }

  success(mensaje: string) {
    this.notyf.success(mensaje);
  }

  error(mensaje: string) {
    this.notyf.error(mensaje);
  }

  warning(mensaje: string) {
    this.notyf.open({
      type: 'warning',
      message: mensaje
    });
  }

  info(mensaje: string) {
    this.notyf.open({
      type: 'info',
      message: mensaje
    });
  }

  personalizado(tipo: 'success' | 'error' | 'warning' | 'info', mensaje: string) {
    this.notyf.open({
      type: tipo,
      message: mensaje
    });
  }
}
