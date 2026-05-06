import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = null;
  projects: any[] = [];
  user: any;

  constructor(
    public auth: AuthService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    this.stats = this.taskService.getDashboardStats(
      this.user.id, this.auth.isAdmin()
    );
    this.projects = this.projectService.getUserProjects(
      this.user.id, this.auth.isAdmin()
    ).slice(0, 4);
  }

  getStatusClass(status: string): string {
    const map: any = {
      'todo': 'status-todo',
      'in-progress': 'status-progress',
      'review': 'status-review',
      'done': 'status-done'
    };
    return map[status] || '';
  }

  getPriorityClass(priority: string): string {
    const map: any = {
      'low': 'pri-low',
      'medium': 'pri-medium',
      'high': 'pri-high',
      'critical': 'pri-critical'
    };
    return map[priority] || '';
  }

  isOverdue(dueDate: string): boolean {
    return dueDate ? new Date(dueDate) < new Date() : false;
  }
}