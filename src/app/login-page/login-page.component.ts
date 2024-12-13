import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../services/backend/backend.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  credentials = {
    username: "",
    password: ""
  }
  error = false;
  constructor(private backend: BackendService, private router: Router) {}

  login() {
    this.backend.authenticate(this.credentials, () => {
      this.router.navigateByUrl("/")
      this.error = !this.backend.getAuthenticationStatus();
    });

  }
}
