import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GenericCRUDService {

  private readonly http = inject(HttpClient);

  // Generic GET (switch 'any' with strong types if possible)
  genericGetAPIData<T>(apiURL: string, options?: { headers?: HttpHeaders; params?: HttpParams }): Observable<T> {
    return this.http.get<T>(apiURL, options).pipe(catchError(error => this.errorHandler(error)));
  }

  // Generic POST (switch 'any' with strong types if possible)
  genericPostAPIData<T>(apiURL: string, payload: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(apiURL, payload, options).pipe(catchError(error => this.errorHandler(error)));
  }

  // Generic PATCH (switch 'any' with strong types if possible)
  genericPatchAPIData<T>(apiURL: string, payload: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.patch<T>(apiURL, payload, options).pipe(catchError(error => this.errorHandler(error)));
  }

  // Generic DELETE 
  genericDeleteAPIData<T>(apiURL: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(apiURL, options).pipe(catchError(error => this.errorHandler(error)));
  }

  // Generic/Global Error Handler
  private errorHandler(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    // You can log the error to an external service or trigger a global toast message
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
