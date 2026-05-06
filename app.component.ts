import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="app-container">
      <ng-container *ngIf="auth.isLoggedIn()">
        <app-navbar></app-navbar>
        <div class="app-body">
          <app-sidebar></app-sidebar>
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </div>
      </ng-container>
      <ng-container *ngIf="!auth.isLoggedIn()">
        <router-outlet></router-outlet>
      </ng-container>
    </div>
  `,
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .app-container { min-height: 100vh; background: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif; }
    .app-body { display: flex; height: calc(100vh - 60px); }
    .main-content { flex: 1; overflow-y: auto; padding: 2rem; background: #f8fafc; }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}