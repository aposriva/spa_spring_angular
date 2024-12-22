import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../services/backend/backend.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  credentials = {
    username: '',
    password: '',
  };
  error = false;
  subscription: any;

  constructor(
    private readonly backend: BackendService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.backend.authenticated.subscribe(
      (authentication) => {
        console.log('Authentication successful, In Login Page', authentication);
        if (authentication) {
          this.error = false;
          this.navigateHome();
        }
      }
    );
  }

  login() {
    this.backend.authenticate(this.credentials);
  }

  navigateHome() {
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('destroyed login');
  }
}
