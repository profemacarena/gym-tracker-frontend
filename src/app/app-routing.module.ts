import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[LoginGuard],
    canMatch:[LoginGuard]
   },
  { path: 'workout', loadChildren: () => import('./workout/workout.module').then(m => m.WorkoutModule),
    canActivate:[AuthGuard],
    canMatch:[AuthGuard],
   },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
