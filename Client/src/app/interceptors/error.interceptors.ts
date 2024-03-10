import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, delay, finalize, throwError } from 'rxjs';
import { BusyService } from '../core/services/busy.service';

@Injectable()
export class errorInterceptors implements HttpInterceptor {
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  busy: BusyService = inject(BusyService);

  // we can also intercepts request using pipe method in service when we get results back
  // this will allow us to make customize error resposnse for all api

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.busy.busy();
    return next.handle(req).pipe(
      // delay(1000),
      finalize(() => {return this.busy.idle()}),
      catchError((error) => {
        if (error.error.statusCode === 400) {
          this.toast.error(error.error.statusCode, error.error.errorMessagge);
        }
        if (error.error.statusCode === 401) {
          this.toast.error(error.error.statusCode, error.error.errorMessagge);
        }
        if (error.error.statusCode === 500) {
          this.route.navigateByUrl('/server-error');
        }
        if (error.error.statusCode === 404) {
          this.route.navigateByUrl('/not-found-error');
        }
        this.busy.idle();
        return throwError(() => error);
      })
    );
  }
}
