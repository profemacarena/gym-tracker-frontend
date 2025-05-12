import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../services/workout-service.service';
import { NotificacionService } from '../../shared/notification.service';

@Component({
  selector: 'app-new-workout',
  standalone: false,
  templateUrl: './new-workout.component.html',
  styleUrl: './new-workout.component.css'
})
export class NewWorkoutComponent {
    public user?:User;
    entrenamientoForm: FormGroup;

    formularioEnviado = false;
    diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  
    constructor(private fb: FormBuilder, private workoutService: WorkoutService,private authService:AuthService,private notify:NotificacionService) {
      this.user=this.authService.currentUser;
      this.entrenamientoForm = this.fb.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        train: ['', [Validators.required]],
        weekday: ['', [Validators.required]],
        user_id: [this.user!.id], // Asumimos que el user_id es el id del usuario actual
        exercises: this.fb.array([this.createExercise()])
      });
    }
  
    ngOnInit(): void {
      
    }
  
    get exercises() {
      return (this.entrenamientoForm.get('exercises') as FormArray);
    }
  
    createExercise(): FormGroup {
      return this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        sets: ['', [Validators.required, Validators.min(1)]],
        reps: ['', [Validators.required, Validators.min(1)]],
        weight: ['', [Validators.required, Validators.min(0)]]
      });
    }
  
    addExercise() {
      this.exercises.push(this.createExercise());
    }
  
    removeExercise(index: number) {
      this.exercises.removeAt(index);
    }
  
    onSubmit() {
      if (this.entrenamientoForm.invalid) {
        return;
      }
  
      const formValue = this.entrenamientoForm.value;
  
      const workoutData = {
        name: formValue.name,
        type: formValue.type,
        train: formValue.train,
        weekday: formValue.weekday,
        user_id: formValue.user_id
      };
  
      const exercises = formValue.exercises;
  
      // Paso 1: Crear el workout junto con los ejercicios
      this.workoutService.createWorkoutWithExercises({
        workout: workoutData,
        exercises
      }).subscribe({
        next: () => {
          console.log('Entrenamiento y ejercicios creados correctamente');
          this.notify.success("Entrenamiento de "+formValue.weekday+" creado correctamente");
        },
        error: (err) => {
          console.error('Error al crear el entrenamiento:', err);
        }
      });
    }

logout(){
  this.authService.logout() 
 }
}


