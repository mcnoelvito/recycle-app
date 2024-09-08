import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanLoad } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  canLoad() : Observable<boolean> {
    return of(true);
  }


  }

