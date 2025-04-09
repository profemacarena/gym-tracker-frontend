import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: `./register.component.css`
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('passwordConfirm')?.value
      ? null
      : { mismatch: true };
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register data:', this.registerForm.value);
      // Aquí llamas a tu servicio para enviar los datos al backend
    }
  }
}
