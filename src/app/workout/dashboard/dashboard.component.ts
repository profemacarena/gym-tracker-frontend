import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public user?:User;
constructor(private authService:AuthService) {
  this.user=authService.currentUser;
}
logout(){
 this.authService.logout() 
}

}
