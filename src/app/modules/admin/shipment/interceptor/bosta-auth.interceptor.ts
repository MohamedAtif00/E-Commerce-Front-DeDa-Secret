import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BostaAuthentication } from '../service/bosta-auth.service';

@Injectable()
export class BostaInterceptor implements HttpInterceptor {
  constructor(private authService: BostaAuthentication) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from the service (modify to fit your auth service)
    const authToken = this.authService.getToken();

    // Clone the request and add the new header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Send the cloned request with the new header to the next handler.
    return next.handle(authReq);
  }
}
