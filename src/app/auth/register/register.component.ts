import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from '../../shared/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: `./register.component.css`
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router,private notify:NotificacionService) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('passwordConfirm')?.value
      ? null
      : { mismatch: true };
  }

onRegisterSubmit(): void {
  if (this.registerForm.valid) {
    const { username, name, lastname, email, password } = this.registerForm.value;

    // Mostrar el spinner de carga
    Swal.fire({
      title: 'Registrando usuario...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.register(username, name, lastname, email, password).subscribe(
      (user) => {
        Swal.close(); // Cerrar el spinner
        this.notify.success("Registro exitoso");
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      (error) => {
        Swal.close(); // Cerrar el spinner
        this.notify.error("El correo electrónico o nombre de usuario ya existe");
      }
    );
  } else {
    this.registerForm.markAllAsTouched();
    this.notify.error("Por favor, rellena todos los campos correctamente");
  }
}

}
