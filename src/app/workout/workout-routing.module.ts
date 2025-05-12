import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';
import { StartWorkoutComponent } from './start-workout/start-workout.component';

const routes: Routes = [
  {path: '',redirectTo:'dashboard',pathMatch: 'full'},
  {path:'dashboard', component: DashboardComponent},
  {path:'new',component:NewWorkoutComponent},
  {path:'mine',component:MyWorkoutsComponent},
  {path:'calendar',component:WeekCalendarComponent},
  {path:'start/:id',component:StartWorkoutComponent}

  // {path: '',redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
