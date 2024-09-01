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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) { }  // Injeksi Router

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  forgotEmailPassword() {
    this.store.dispatch(show());

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
