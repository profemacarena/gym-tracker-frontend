import { Exercise } from "./exercise.interface";
import { Workout } from "./workout.interface";

export interface WorkoutExercise {
    id:               number;
    entrenamiento_id: number;
    exercise_id:      number;
    sets:             number;
    reps:             number;
    weight:           string;
    created_at:       Date;
    updated_at:       Date;
    exercise:         Exercise;
    entrenamiento:    Workout;
}


