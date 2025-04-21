import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  apiUrl=environment.apiUrl
  forgotForm: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.successMsg = '';
    this.errorMsg = '';

    console.log(this.forgotForm.value);

    this.http.post(`${this.apiUrl}/forgot-password`, this.forgotForm.value)
      .subscribe({
        next: () => {
          this.successMsg = 'Correo enviado con el enlace de recuperación.';
        },
        error: (err) => {
          this.errorMsg = 'Error al enviar el correo.';
        }
      });
  }
}

