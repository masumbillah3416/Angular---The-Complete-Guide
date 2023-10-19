import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observer, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit , OnDestroy {
  isLoginMode = true;
  isLoading = false;
  alert: string = null;
  loginSubscription : Subscription;
  signInSubscription : Subscription;

  /**
   *
   */
  constructor(private authService: AuthService, private router: Router) { }
  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.signInSubscription?.unsubscribe();

  }

  ngOnInit(): void { 
  
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login(form: NgForm) {
    this.alert = null;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      const signInObserver: Observer<any> = {
        next: (response) => {
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          console.log(error);
          this.alert = error;
          this.isLoading = false;
        },
        complete: () => {
          console.log('completed');
          this.isLoading = false;
        },
      };
      this.loginSubscription = this.authService.login(email, password).subscribe(signInObserver);
    } else {
      const signUpObserver: Observer<any> = {
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          this.alert = error;
          this.isLoading = false;
        },
        complete: () => {
          console.log('completed');
          this.isLoading = false;
        },
      };
      this.signInSubscription = this.authService.signup(email, password).subscribe(signUpObserver);
    }
    form.reset();
  }
}
