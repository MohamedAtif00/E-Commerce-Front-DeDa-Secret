import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl:'./admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  authService = inject(AuthService);
  constructor(  private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        console.log(data);
        
        this.router.navigate(['admin-login']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }


}
