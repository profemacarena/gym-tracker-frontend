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


@NgModule({
  declarations: [DashboardComponent, DashboardSummaryComponent, TodayWorkoutComponent, WeekCalendarComponent, ProgressStatsComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    SharedModule
  ]
})
export class WorkoutModule { }
