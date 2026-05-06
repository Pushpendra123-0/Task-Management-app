import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { UsersComponent } from './pages/users/users.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [authGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '/dashboard' }
];