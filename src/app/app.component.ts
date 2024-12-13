import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BackendService } from './services/backend/backend.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Spring Single Page App';
  constructor(private backend: BackendService, private router: Router) {
    this.backend.authenticate(undefined, undefined);
  }

  logout() {
    // code for logout
    this.backend.logout(() => {
      this.router.navigateByUrl("/login");
    });
  }
}
