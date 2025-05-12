import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.interface';
import { Workout } from '../../../interfaces/workout.interface';
import { WorkoutService } from '../../services/workout-service.service';

@Component({
  selector: 'app-dashboard-summary',
  standalone: false,
  templateUrl: './dashboard-summary.component.html',
  styles: ``
})
export class DashboardSummaryComponent implements OnInit {
  public user?:User;
  public fraseSeleccionada:string="";
  public frases: string[] = [
    "¡A darle caña!",
    "¡A tope!",
    "¡Toca entrenar!",
    "¡Vamos con todo!",
    "¡Dale duro!",
    "¡No hay excusas!",
    "¡Rompe tus límites!"  ];
    public fechaHoy?:String //la fecha completa de hoy, con dia de la semana, del mes y año
    public entrenamiento?:Workout
    public weekDayHoy:string="" //el dia de la semana de hoy

    
  
  constructor(private authService:AuthService,private workoutService:WorkoutService) {
    this.user=this.authService.currentUser;
    this.fraseSeleccionada=this.frases[Math.floor(Math.random()*this.frases.length)]
    const today = new Date();
    this.fechaHoy = today.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.fechaHoy = this.fechaHoy.charAt(0).toUpperCase() + this.fechaHoy.slice(1);
    this.weekDayHoy = today.toLocaleDateString('es-ES', { weekday: 'long' });  
      
  }
  ngOnInit(): void {
    this.getWorkoutsByUser()
  }

  getWorkoutsByUser() {
    this.workoutService.getWorkoutsByUser(this.user!.id).subscribe(workouts => {
      this.entrenamiento = workouts.find(workout => workout.weekday === this.weekDayHoy);
  
      if (!this.entrenamiento) {
        this.entrenamiento = {
          id: 0,
          name: 'Descanso',
          type: '',
          train: '',
          weekday: this.weekDayHoy,
          user_id: this.user!.id,
          created_at: new Date(),
          updated_at: new Date()
        };
      }
    });
  }
  

}
