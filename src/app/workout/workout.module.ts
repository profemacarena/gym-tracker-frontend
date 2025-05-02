import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { TodayWorkoutComponent } from './components/today-workout/today-workout.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';
import { ProgressStatsComponent } from './components/progress-stats/progress-stats.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';


@NgModule({
  declarations: [DashboardComponent, DashboardSummaryComponent, TodayWorkoutComponent, WeekCalendarComponent, ProgressStatsComponent, NewWorkoutComponent, MyWorkoutsComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    SharedModule,ReactiveFormsModule,FormsModule
  ]
})
export class WorkoutModule { }
