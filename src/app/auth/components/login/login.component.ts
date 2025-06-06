import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManagerService } from '../../../services/auth/auth.manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private authManagerService: AuthManagerService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    try {
      const isAuthenticated = await this.authManagerService.login(this.username, this.password);
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('An error occurred during login.');
    }
  }

  // loginViaGoogle() {
  //   this.authManagerService.loginViaGoogle();
  // }
}