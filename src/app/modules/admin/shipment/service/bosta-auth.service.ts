import { Injectable } from '@angular/core';
import { GenericCRUDService } from '../../../../core/services/genenric-crud.service';
import { Observable, tap } from 'rxjs';
import {
  BostaLoginRequest,
  BostaLoginResponse,
  LoginData,
} from '../model/auth.model';
import { bosta } from '../static/bosta-info';
import {
  UserData,
  ViewUserDataResponse,
} from '../model/shipment.user-data.model';
import { HttpHeaders } from '@angular/common/http';
import { SendInformation } from '../model/auth.model';
import { GeneralResponse } from '../../../../core/model/general-response.model';
import { development } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BostaAuthentication {
  private tokenKey = 'BostaToken';
  private postLogin = bosta.login;
  private getViewData = bosta.ViewData;
  private sendInformation = development.localhosts.shipment.sendInformation;

  loginData: LoginData;
  userData: UserData;

  headers = new HttpHeaders().set('Authorization', this.getToken());

  constructor(private _http: GenericCRUDService) {}

  /**
   * Handles user login by sending credentials to the API.
   * @param credentials - The user's email and password.
   * @returns Observable of BostaLoginResponse with user details and token.
   */
  login(credentials: BostaLoginRequest): Observable<BostaLoginResponse> {
    return this._http
      .genericPostAPIData<BostaLoginResponse>(this.postLogin, credentials)
      .pipe(
        tap((response: any) => {
          // Store token in local storage after successful login
          localStorage.setItem(this.tokenKey, response.data.token);
          this.loginData = response.data;
        })
      );
  }

  /**
   * Logs the user out by clearing stored data like token or session.
   * @returns void
   */
  logout(): void {
    // Implement logout logic, e.g., clearing local storage
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated by verifying if a token exists.
   * @returns boolean - true if authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  /**
   * Stores the authentication token after login.
   * @param token - The token received from the server after login.
   */
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the user data by token 
   */
  GetUserData() {
    const token = this.getToken(); // Get token from localStorage

    if (!token) {
      console.error('No token found'); // Handle missing token case
    }

    // Set the Authorization header with the raw token (without 'Bearer')
    const headers = new HttpHeaders().set('Authorization', token);
    return this._http
      .genericGetAPIData<ViewUserDataResponse>(this.getViewData, {
        headers: headers,
      })
      .pipe(
        tap((data) => {
          console.log('token', this.getToken());

          this.userData = data.data;
        })
      );
  }

  StoreData(request: SendInformation) {
    return this._http.genericPostAPIData<GeneralResponse<any>>(
      this.sendInformation,
      request
    );
  }
}
