import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from './app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const navigateAwayFromAuth = route.data['navigateAwayFromAuth'];
    return this.store.select('authentication')
      .pipe(
        map(({ user }) => user),
        map(user => {
          if (navigateAwayFromAuth && !!user) {
            this.router.navigate(['/cpus']);
            return true;
          }
          if (!!user) {
            return true;
          } else {
            // this.router.navigate(['/']);
          }
          return false;
        })
      )
  }
}
