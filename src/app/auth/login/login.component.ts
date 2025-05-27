import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../shared/notification.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
    const { email, password } = this.loginForm.value;

    // Mostrar el spinner de carga
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.login(email, password).subscribe({
      next: (user) => {
        Swal.close(); // Cerrar el spinner
        this.notify.success('Login Correcto');
        setTimeout(() => {
          this.router.navigate(['/workout/']);
        }, 1000);
      },
      error: (err) => {
        Swal.close(); // Cerrar el spinner
        this.notify.error('Credenciales incorrectas');
      }
    });

  } else {
    this.notify.error('Los datos no son válidos');
  }
}

}
