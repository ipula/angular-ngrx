import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGurad implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl('');
        }
      })
    );

  }

}
