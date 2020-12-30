import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  authSubscription: Subscription;
  isErrorOnLogin = false;
  infoMessage = 'Login Problem';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email ]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.authSubscription = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
      this.isErrorOnLogin = true;
    });
  }

  onHandleError() {
    this.isErrorOnLogin = null;
  }

  onLogin() {
    if (this.loginForm.value.email === '' || this.loginForm.value.password === '') {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
