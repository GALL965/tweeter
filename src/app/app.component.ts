import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public router: Router) {}

  shouldShowNavbar(): boolean {
    const hiddenRoutes = ['/', '/login', '/register'];  // oculta en estas rutas
    return !hiddenRoutes.includes(this.router.url);
  }
}
