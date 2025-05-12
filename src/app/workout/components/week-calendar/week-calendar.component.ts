import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { WorkoutService } from '../../services/workout-service.service';
import { User } from '../../../interfaces/user.interface';
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  standalone:false,
  styleUrl: './week-calendar.component.css'
})
export class WeekCalendarComponent implements OnInit {
  public selectedworkout: any = null;
  public selectedWorkoutExercises: any[] = [];
  public user?: User;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: window.innerWidth < 640 ? 'dayGridDay' : 'dayGridWeek',
    locale: esLocale,
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    windowResize: (view) => {
      const calendarApi = view.view.calendar;
      if (window.innerWidth < 640) {
        calendarApi.changeView('dayGridDay');
      } else {
        calendarApi.changeView('dayGridWeek');
      }
    }
  };
  
  

  constructor(private auth: AuthService, private workoutService: WorkoutService) {
    this.user = this.auth.currentUser;
  }

  ngOnInit(): void {
    if (!this.user) return;

    this.workoutService.getWorkoutsByUser(this.user.id).subscribe(workouts => {
      const events = workouts.map(w => ({
        title: w.name,
        start: this.getDateForWeekday(w.weekday, 10), // 10:00 AM por defecto
        end: this.getDateForWeekday(w.weekday, 11),   // 11:00 AM fin
        id: w.id.toString(),
        color: '#0f766e',
      }));
      this.calendarOptions.events = events;
    });
  }

  handleEventClick(arg: any) {
  }

  getDateForWeekday(weekday: string, hour: number): string {
    const weekdayMap: { [key: string]: number } = {
      'lunes': 1,
      'martes': 2,
      'miércoles': 3,
      'jueves': 4,
      'viernes': 5,
      'sábado': 6,
      'domingo': 0,
    };

    const today = new Date();
    const currentWeekday = today.getDay();
    const targetWeekday = weekdayMap[weekday.toLowerCase()] ?? 1;
    const diff = (targetWeekday + 7 - currentWeekday) % 7;
    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    date.setHours(hour, 0, 0, 0);
    return date.toISOString();
  }
}

