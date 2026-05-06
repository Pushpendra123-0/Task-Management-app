import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  activeTab = 'login';
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupRole: 'admin' | 'member' = 'member';
  signupError = '';
  signupSuccess = '';

  constructor(private auth: AuthService, private router: Router) {
    if (auth.isLoggedIn()) router.navigate(['/dashboard']);
  }

  login() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password.';
    }
  }

  signup() {
    if (!this.signupName || !this.signupEmail || !this.signupPassword) {
      this.signupError = 'Please fill in all fields.';
      return;
    }
    if (this.signupPassword.length < 6) {
      this.signupError = 'Password must be at least 6 characters.';
      return;
    }
    const success = this.auth.addUser({
      name: this.signupName,
      email: this.signupEmail,
      password: this.signupPassword,
      role: this.signupRole
    });
    if (success) {
      this.signupSuccess = 'Account created! Please login.';
      this.signupError = '';
      this.activeTab = 'login';
      this.email = this.signupEmail;
    } else {
      this.signupError = 'Email already exists.';
    }
  }
}