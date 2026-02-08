import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage = '';
  form: FormGroup;
  loadingCustomers = true;
  imageSrc = 'assets/images/webcompanion.png';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // Track when customers have loaded to avoid premature login attempts
    // Stop loading indicator when customers load attempt completes
    this.auth.customersLoaded$.subscribe(() => {
      this.loadingCustomers = false;
    });
  }

  onImgError(): void {
    // Fallback to bundled SVG if the attached image is missing
    this.imageSrc = 'assets/realestate-companion.svg';
  }

  async submit(): Promise<void> {
    this.errorMessage = '';
    const { userId, password } = this.form.value;
    if (!userId || !password) {
      this.errorMessage = 'Please enter your user ID and password.';
      return;
    }
    const ok = await this.auth.login(userId, password);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  }
}
