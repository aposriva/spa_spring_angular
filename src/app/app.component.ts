import { Component, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { BackendService } from './services/backend/backend.service';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbNavModule, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Spring Single Page App';
  authenticated = false;
  subscription: any;
  isMenuCollapsed = true;

  constructor(
    private readonly backend: BackendService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.backend.authenticated.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        console.log('Authentication successful, In App', authenticated);
      }
    );
  }

  logout() {
    // code for logout
    this.backend.logout(() => {
      this.router.navigateByUrl('/login');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('destroyed app');
  }
}
