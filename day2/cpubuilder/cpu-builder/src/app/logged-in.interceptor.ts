import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';

import { map, exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('authentication')
      .pipe(
        map((authState) => authState.user),
        exhaustMap((user) => {
          console.log('check user data!');
          console.log(user);
          if (!user) {
            return next.handle(request);
          }
          const modifyRequest = request.clone({
            headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
          });
          return next.handle(modifyRequest);
        })
      )
  }
}
