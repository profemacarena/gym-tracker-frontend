import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../../interfaces/workout.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise } from '../../interfaces/exercise.interface';
import { WorkoutExercise } from '../../interfaces/workout-exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
    private apiUrl=environment.apiUrl;
  

  constructor(private http:HttpClient) {}

  createWorkout(body: Workout) {
    return this.http.post<Workout>(`${this.apiUrl}/workouts`, body);
  }
  getWorkout(id:number){
    return this.http.get<Workout>(`${this.apiUrl}/workouts/${id}`);
  }
  updateWorkout(body: Workout, id: number) {
    return this.http.patch<Workout>(`${this.apiUrl}/workouts/${id}`, body);
  }
  
  deleteWorkout(id:number){
    return this.http.delete<Workout>(`${this.apiUrl}/workouts/${id}`);
  }
  getWorkoutsByUser(idUser:number){
    return this.http.get<Workout[]>(`${this.apiUrl}/workouts/user/${idUser}`);
  }
  getWorkoutsByUserAndType(idUser:number,type:string){
    return this.http.get<Workout[]>(`${this.apiUrl}/workouts/user/${idUser}/type/${type}`);
  }
  getWorkoutsByUserAndTrain(idUser:number,train:string){
    return this.http.get<Workout[]>(`${this.apiUrl}/workouts/user/${idUser}/train/${train}`);
  }

  //exercises
  getAllExercises() {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises`);
  }
  
  getExerciseById(id: number) {
    return this.http.get<Exercise>(`${this.apiUrl}/exercises/${id}`);
  }
  
  createExercise(exercise: Omit<Exercise, 'id'>) {
    return this.http.post<Exercise>(`${this.apiUrl}/exercises`, exercise);
  }
  
  updateExercise(id: number, exercise: Exercise) {
    return this.http.put<Exercise>(`${this.apiUrl}/exercises/${id}`, exercise);
  }
  
  deleteExercise(id: number) {
    return this.http.delete(`${this.apiUrl}/exercises/${id}`);
  }

  //relacion workout-exercises
  getAllWorkoutExercises() {
    return this.http.get<WorkoutExercise[]>(`${this.apiUrl}/workout-exercises`);
  }
  
  getWorkoutExerciseById(id: number) {
    return this.http.get<WorkoutExercise>(`${this.apiUrl}/workout-exercises/${id}`);
  }
  
  createWorkoutWithExercises(data: any) {
    return this.http.post(`${this.apiUrl}/workouts/full`, data);
  }
  
  
  updateWorkoutExercise(id: number, data: WorkoutExercise) {
    return this.http.put<WorkoutExercise>(`${this.apiUrl}/workout-exercises/${id}`, data);
  }
  
  deleteWorkoutExercise(id: number) {
    return this.http.delete(`${this.apiUrl}/workout-exercises/${id}`);
  }
  
  getExercisesByWorkout(workoutId: number) {
    return this.http.get<WorkoutExercise>(`${this.apiUrl}/workouts/${workoutId}/exercises`);
  }
  getWorkoutsByExercise(exerciseId: number) {
    return this.http.get<Workout[]>(`${this.apiUrl}/exercises/${exerciseId}/workouts`);
  }
    

  

}
