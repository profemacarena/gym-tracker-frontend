import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';

const routes: Routes = [
  {path: '',redirectTo:'dashboard',pathMatch: 'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'new',component:NewWorkoutComponent},
  {path:'mine',component:MyWorkoutsComponent},

  // {path: '',redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
