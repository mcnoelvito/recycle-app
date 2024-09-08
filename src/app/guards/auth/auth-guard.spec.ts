import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/store/login/login.reducers';
import { AuthGuardService } from './auth-guard';
import { AppState } from 'src/store/AppState';
import { loginSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({}),
        StoreModule.forFeature("login", loginReducer),
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should allow logged user to access page', () => {
    service.canLoad().subscribe(isAllowed => {
      store.dispatch(loginSuccess ({user: new User()}));

      service.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });
    it('should not allow not  to  page if user is not logged in', () => {

        service.canLoad().subscribe(isAllowed => {
        expect(isAllowed).toBeFalsy();
    })
  })
  it('should not allow user be sent ito the login page', () => {
    spyOn(router, 'navigateByUrl');
    service.canLoad().subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
})
  })

});
