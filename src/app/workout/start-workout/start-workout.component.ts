import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../services/workout-service.service';

@Component({
  selector: 'app-start-workout',
  standalone: false,
  templateUrl: './start-workout.component.html',
  styles: ``
})
export class StartWorkoutComponent implements OnInit {
  public workoutId: number = 0;
  public exercises: any[] = [];
  public currentExerciseIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.workoutId = id ? parseInt(id, 10) : 0;

    this.workoutService.getExercisesByWorkout(this.workoutId).subscribe(exercises => {
      this.exercises = exercises.map(exercise => ({
        ...exercise,
        currentSet: 1,
        log: [],
        nuevaSerie: {
          reps: null,
          weight: null
        }
      }));
    });
  }

  get currentExercise() {
    return this.exercises[this.currentExerciseIndex];
  }

  registrarSerie() {
  const ex = this.currentExercise;

  const payload = {
    workout_exercise_id: ex.id,
    set_number: ex.currentSet,
    reps: ex.nuevaSerie.reps,
    weight: ex.nuevaSerie.weight
  };

  this.workoutService.addExerciseLog(payload).subscribe(() => {
    ex.log.push(payload);
    ex.nuevaSerie = { reps: null, weight: null };
    ex.currentSet++;

    if (ex.currentSet > ex.sets) {
      this.currentExerciseIndex++;
    }
  });
}

}
