import { Component } from '@angular/core';
import { BostaAuthentication } from '../service/bosta-auth.service';
import { BostaLoginRequest, SendInformation } from '../model/auth.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bosta-login',
  templateUrl: './bosta-login.component.html',
  styleUrl: './bosta-login.component.scss',
})
export class BostaLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: BostaAuthentication,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    const credentials: BostaLoginRequest = {
      email: this.email,
      password: this.password,
    };
    this.authService.login(credentials).subscribe(
      (response) => {
        // Handle success, such as storing the token and redirecting
        console.log('Login successful', response);
        if (response.success) {
          let request: SendInformation = {
            email: response.data.user.emails[0].address,
            fullName: `${response.data.user.profile.firstName} ${response.data.user.profile.lastName}`,
            token: response.data.token,
          };
          this.authService.StoreData(request).subscribe((data) => {
            if (data.isSuccess) {
              this.toastr.success('Login Complete', '', { closeButton: true });
            }
          });

          this.router.navigate(['admin', 'shipment']);
        }
      },
      (error) => {
        // Handle error
        this.errorMessage = 'Invalid email or password';
        console.error('Login failed', error);
      }
    );
  }
}
