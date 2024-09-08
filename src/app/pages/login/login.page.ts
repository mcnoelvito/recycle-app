import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Impor Router untuk navigasi
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { hide, show } from 'src/store/loading/loading.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';

import { Subscription } from 'rxjs';
;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) { }  // Injeksi Router


  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {

      this.onIsRecoveredPassword(loginState);



      this.onIsLoggedIn(loginState);

      this.toggleLoding(loginState);
    })
  }
  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoding(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else
      this.store.dispatch(hide());
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }




  private async onError(loginState: LoginState){
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      toaster.present();
    }
  }



  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000)
  }


  login() {
    this.store.dispatch(login());
  }

  register() {
    this.router.navigate(['register']);
  }

}

