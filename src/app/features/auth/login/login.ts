import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from 'src/app/core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule, RouterModule]
})
export class Login {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  error = '';
  loading = signal(false);

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  submit() {
    if (this.form.invalid) return;
  
    this.loading.set(true);
    this.error = '';
    
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.auth.saveToken(res.token);
        this.auth.loadUser();
        this.router.navigate(['/companies']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error = 'Login inválido';
      }
    });
  }
}