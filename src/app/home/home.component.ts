import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = "Home";
  greeting = {id: undefined, content: undefined};
  constructor(private backend: BackendService) {
    this.backend.getResources((id, content) => {
      this.greeting.id = id;
      this.greeting.content = content
    });
  }

  authenticated() {
    return this.backend.getAuthenticationStatus();
  }
}
