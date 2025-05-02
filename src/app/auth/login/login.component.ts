import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../shared/notification.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private notify:NotificacionService,private authService:AuthService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const {email,password}=this.loginForm.value;
      this.authService.login(email,password).subscribe({
        next:(user)=>{
          this.notify.success('Login Correcto');
          setTimeout(() => {
            this.router.navigate(['/workout/']);
          }, 1000);
        },
        error:(err)=>{
          this.notify.error("Credenciales incorrectas");
          console.error('Error en login:', err);
        }
      })

    }else{
      this.notify.error("Los datos no son válidos")
    }
  }
}
