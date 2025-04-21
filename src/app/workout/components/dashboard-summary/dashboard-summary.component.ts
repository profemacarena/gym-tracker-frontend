import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard-summary',
  standalone: false,
  templateUrl: './dashboard-summary.component.html',
  styles: ``
})
export class DashboardSummaryComponent {
  public user?:User;
  public fraseSeleccionada:string="";
  public frases: string[] = [
    "¡A darle caña!",
    "¡A tope!",
    "¡Toca entrenar!",
    "¡Hoy no se descansa!",
    "¡Vamos con todo!",
    "¡Fuego a los hierros!",
    "¡Dale duro!",
    "¡No hay excusas!",
    "¡Rompe tus límites!"  ];
  
  constructor(private authService:AuthService) {
    this.user=authService.currentUser;
    this.fraseSeleccionada=this.frases[Math.floor(Math.random()*this.frases.length)]
  }

}
