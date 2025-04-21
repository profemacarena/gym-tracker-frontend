import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone:false,
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token = '';
  successMsg = '';
  errorMsg = '';
  apiUrl=environment.apiUrl
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    const email = this.route.snapshot.queryParamMap.get('email');
  
    console.log('Token:', this.token);
    console.log('Email:', email);
  }

  onSubmit() {
    if (!this.token) {
      this.errorMsg = 'Token inválido.';
      return;
    }

    const formData = {
      ...this.resetForm.value,
      token: this.token
    };

    this.http.post(`${this.apiUrl}/reset-password`, formData)
      .subscribe({
        next: () => {
          this.successMsg = 'Contraseña actualizada correctamente.';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: (err) => {
          this.errorMsg = 'No se pudo restablecer la contraseña.';
        }
      });
  }
}

