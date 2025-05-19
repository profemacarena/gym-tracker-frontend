import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanMatch,CanActivate{
    constructor(private authService:AuthService, private router:Router) { }
    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        return this.checkAuthStatus();    
      }
     
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {   
        return this.checkAuthStatus();
      }
      private checkAuthStatus(): boolean | Observable<boolean>{
        return this.authService.checkAuthenticacion()
          .pipe(
            tap( isAuthenticated => {
              if ( isAuthenticated ){
                this.router.navigate(['/workout/dashboard'])
              }})
          )
      } 
}
