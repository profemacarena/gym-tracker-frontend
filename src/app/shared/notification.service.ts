import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notyf: Notyf;
  private isEventListenerAdded: boolean = false; // Flag para controlar el estado del listener

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

  confirm(mensaje: string, onConfirm: () => void, onCancel: () => void) {
    const modalId = 'confirmation-modal';
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
    
    const messageElement = document.getElementById('modal-message');
    if (messageElement) {
      messageElement.innerText = mensaje;
    }

    if (!this.isEventListenerAdded) {
      const confirmButton = document.getElementById('confirm-button');
      confirmButton?.addEventListener('click', () => {
        onConfirm();
        if (modal) {
          modal.classList.add('hidden'); 
        }
      });

      const cancelButton = document.getElementById('cancel-button');
      cancelButton?.addEventListener('click', () => {
        onCancel();
        if (modal) {
          modal.classList.add('hidden'); 
        }
      });
      this.isEventListenerAdded = true;
    }
  }

  personalizado(tipo: 'success' | 'error' | 'warning' | 'info', mensaje: string) {
    this.notyf.open({
      type: tipo,
      message: mensaje
    });
  }
}
