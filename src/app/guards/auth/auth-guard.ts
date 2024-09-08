import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { CanLoad } from '@angular/router';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private store: Store<AppState>) { }

  canLoad() : Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
      return of(loginState.isLoggedIn);
    }));
  }
}
