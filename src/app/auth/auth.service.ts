import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl=environment.apiUrl;
  private user?:User;


  constructor(private http:HttpClient) { }

  get currentUser():User|undefined{
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }
//METODOS
  public login(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>(`${this.apiUrl}/login`, body).pipe(
      tap(user => {
        this.user = user;
        localStorage.setItem('token', JSON.stringify(user));
      })
    );
  }
  public register(username: string,name: string,lastname: string,email: string,password: string): Observable<User> {
    const body = { username, name, lastname, email, password };
    return this.http.post<User>(`${this.apiUrl}/users`, body).pipe(
      tap((user) => {
        localStorage.setItem('token', JSON.stringify(user));
      })
    );
  }

  logout () {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticacion(): Observable<boolean>{
   
    if (!localStorage.getItem('token')) return of(false);
   
    const token = localStorage.getItem('token');
    if (!token) return of(false);
    const userLogeado = JSON.parse(token);

    return this.http.get<User>(`${ this.apiUrl }/users/${userLogeado.id}`)
            .pipe (
              tap ( user => this.user=user),
              map ( user => !!user),
              catchError ( err => of(false))
            )
  }
  
}
