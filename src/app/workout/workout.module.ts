import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSummaryComponent } from './components/dashboard-summary/dashboard-summary.component';
import { TodayWorkoutComponent } from './components/today-workout/today-workout.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyWorkoutsComponent } from './my-workouts/my-workouts.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StartWorkoutComponent } from './start-workout/start-workout.component'; // debe ir arriba



@NgModule({
  declarations: [DashboardComponent, DashboardSummaryComponent, TodayWorkoutComponent, WeekCalendarComponent, NewWorkoutComponent, MyWorkoutsComponent, StartWorkoutComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    SharedModule,ReactiveFormsModule,FormsModule,FullCalendarModule
  ]
})
export class WorkoutModule { }
