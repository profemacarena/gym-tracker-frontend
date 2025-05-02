import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-logged-navbar',
  standalone: false,
  templateUrl: './logged-navbar.component.html',
  styleUrl: './logged-navbar.component.css'
})
export class LoggedNavbarComponent {
 public user?:User;
constructor(private authService:AuthService) {
  this.user=authService.currentUser;
}
logout(){
 this.authService.logout() 
}
}
