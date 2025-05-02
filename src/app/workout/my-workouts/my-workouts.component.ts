import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workout-service.service';
import { Workout } from '../../interfaces/workout.interface';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../shared/notification.service';
import { WorkoutExercise } from '../../interfaces/workout-exercise.interface';

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css'],
  standalone: false
})
export class MyWorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  userId: number = 0; // Puedes obtenerlo desde un AuthService o similar

  // Definición del formulario reactivo
  editForm: FormGroup;

  // Nuevo estado del modal
  isEditModalOpen: boolean = false;  // Controlamos si el modal de edición está abierto o cerrado

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private notify:NotificacionService
  ) {
    // Inicialización del formulario reactivo con validaciones
    this.editForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: ['', Validators.required],
      train: ['', Validators.required],
      weekday: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí deberías obtener el ID del usuario real desde el login
    this.userId = this.authService.currentUser!.id;

    // Cargar los entrenamientos al inicializar el componente
    this.loadWorkouts();
  }

  // Función para cargar los entrenamientos del usuario
  loadWorkouts(): void {
    this.workoutService.getWorkoutsByUser(this.userId).subscribe({
      next: (res) => this.workouts = res,
      error: (err) => console.error('Error al cargar entrenamientos', err)
    });
  }

  // Función para eliminar un entrenamiento
  onDelete(id: number): void {
    this.notify.confirm(
      '¿Estás seguro de que quieres eliminar este entrenamiento?',
      () => { // Si el usuario confirma
        this.workoutService.deleteWorkout(id).subscribe({
          next: () => {
            this.loadWorkouts();
            this.notify.success('Entrenamiento eliminado correctamente');
          },
          error: (err) => {
            console.error('Error al eliminar entrenamiento', err);
            this.notify.error('Hubo un error al eliminar el entrenamiento');
          }
        });
      },
      () => { // Si el usuario cancela
        this.notify.info('Eliminación cancelada');
      }
    );
  }
  

  // MENÚ DEL MÓVIL
  openMenuId: number | null = null;

  toggleMenu(id: number) {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  closeMenu() {
    this.openMenuId = null;
  }

  // MODAL
  // Aquí asegúrate de que selectedWorkoutExercises sea un array vacío al inicio
selectedWorkoutExercises: WorkoutExercise[] = [];  // Inicialízalo como un array vacío
selectedworkout?: Workout;

// Función para mostrar detalles del entrenamiento
onView(workout: any) {
  this.workoutService.getExercisesByWorkout(workout.id).subscribe({
    next: (data) => {
      // Si data es un array, se asigna directamente a selectedWorkoutExercises ya que puede traer un array o un objeto
      if (Array.isArray(data)) {
        this.selectedWorkoutExercises = data; 
      } else {
        // Si data no es un array, puedes empujarlo de todos modos
        this.selectedWorkoutExercises.push(data);
      } 
    },
    error: (err) => console.error('Error al cargar detalles de ejercicios:', err)
  });

  // Llama al servicio para obtener los detalles del entrenamiento
  this.workoutService.getWorkout(workout.id).subscribe({
    next: (data) => {
      this.selectedworkout = data;  // Aquí se asigna el entrenamiento completo
    },
    error: (err) => console.error('Error al cargar detalles del entrenamiento:', err)
  });
}


  closeModal() {
    this.selectedWorkoutExercises=[]
  }

  // Función para inicializar el formulario con los datos del entrenamiento a editar
  onEdit(workout: any): void {
    this.isEditModalOpen = true;  // Mostrar el modal
    this.editForm.setValue({
      id: workout.id,
      name: workout.name,
      type: workout.type,
      train: workout.train,
      weekday: workout.weekday
    });
  }

  // Función para cerrar el modal de edición
  closeEditModal(): void {
    this.isEditModalOpen = false;  // Ocultar el modal
    this.editForm.reset();
  }

  // Función para guardar los cambios del formulario de edición
  saveChanges(): void {
    if (this.editForm.invalid) return;

    const updatedWorkout = this.editForm.value;
    const index = this.workouts.findIndex(w => w.id === updatedWorkout.id);
    if (index !== -1) {
      this.workouts[index] = updatedWorkout;

      // Aquí llamarías a tu servicio para guardar los cambios
      this.workoutService.updateWorkout(updatedWorkout, updatedWorkout.id).subscribe({
        next: () => {
          this.notify.success("Entrenamiento Actualizado")
          this.closeEditModal();
        },
        error: (err) => console.error('Error al actualizar el entrenamiento', err)
      });
    }
  }


}


