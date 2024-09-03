import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { development } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;

    private adminLogin = development.localhosts.account.adminLogin
    
    
  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.adminLogin, { email, password }).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
