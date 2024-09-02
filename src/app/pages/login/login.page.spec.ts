import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { By } from '@angular/platform-browser';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: { querySelector: (arg0: string) => { (): any; new(): any; click: { (): void; new(): any; }; }; };
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer)
      ],
      providers: [
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;  // Trigger ngOnInit and initial rendering
  }));

  it('should create form on init', () => {
    expect(component.form).toBeDefined();
  });

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form?.get('email')?.setValue("valid@email.com");
    page.querySelector('#recoveryPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  })
  it('should show loading when recovering password', () => {
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    page.querySelector('#recoveryPasswordButton').click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })
  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);

  })
  it('should hide loading and show error message when has not recover password', () => {
    fixture.detectChanges ();
store.dispatch(recoverPassword());
store.dispatch(recoverPasswordFail({error: "message"}));
store.select('loading').subscribe(loadingState => {
  expect(loadingState.show).toBeFalsy();
})
expect(toastController.create).toHaveBeenCalledTimes(1);
  })
  it('should hide loading and start login  when logging in', () => {
    fixture.detectChanges ();
component.form.get('email')?.setValue("valid@email.com");
component.form.get('password')?.setValue("anyPAssword");
page.querySelector('#loginButton').click();
store.select('loading').subscribe(loadingState => {
  expect(loadingState.show).toBeTruthy();
})
store.select('login').subscribe(loadingState => {
  expect(loadingState.isLoggingIn).toBeFalsy();
})
})

});
