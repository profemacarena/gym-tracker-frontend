import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.interface';
import { WorkoutService } from '../../services/workout-service.service';

@Component({
  selector: 'app-today-workout',
  standalone: false,
  templateUrl: './today-workout.component.html',
  styles: ``
})
export class TodayWorkoutComponent {
  public user?:User
  public todayWorkout?:any;
  public weekDayHoy:string="" //el dia de la semana de hoy

  constructor(private auth:AuthService, private workoutService:WorkoutService) {
    this.user=this.auth.currentUser;
    const today=new Date()
    this.weekDayHoy = today.toLocaleDateString('es-ES', { weekday: 'long' });  
    this.workoutService.getWorkoutsAndExercisesByUser(this.user!.id).subscribe(workouts=>{
     this.todayWorkout=workouts.find(w=>w.weekday==this.weekDayHoy);
     
    })
  }
}
