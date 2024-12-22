import { Component, signal } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  title = 'Home';
  greeting = { id: undefined, content: undefined };
  authenticated = false;
  subscription: any;
  constructor(private readonly backend: BackendService) {}
  ngOnInit() {
    this.subscription = this.backend.authenticated.subscribe(
      (authentication) => {
        this.authenticated = authentication;
        console.log('Authentication successful, In Home', authentication);
        if (authentication) {
          console.log(
            'Authentication successful, calling get resources',
            authentication
          );
          this.backend.getResources((id, content) => {
            this.greeting.id = id;
            this.greeting.content = content;
          });
        }
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('destroyed home');
  }
}
