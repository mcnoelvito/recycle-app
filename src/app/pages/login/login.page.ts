import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Impor Router untuk navigasi
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { hide, show } from 'src/store/loading/loading.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { recoverPassword } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) { }  // Injeksi Router

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.store.select('login').subscribe(loginState => {
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoveredPassword(loginState);
    })
  }

  private onIsRecoveringPassword(loginState: LoginState){
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    }
  }
  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());

    setTimeout(() => {
      this.store.dispatch(hide());
    }, 3000)
  }


  login() {
    this.router.navigate(['home']);
  }

  register() {
    this.router.navigate(['register']);
  }

}
