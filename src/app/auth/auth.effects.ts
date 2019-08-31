import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, Login, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';



@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
    })
  );

  @Effect()
  init$ = defer(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const data = JSON.parse(userData);
      return of(new Login({ user: data }));
    } else {
      return of(new Logout());
    }
  });
  constructor(private actions$: Actions, private router: Router) { }

}
