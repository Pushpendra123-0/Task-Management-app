import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  showForm = false;
  editProject: Project | null = null;
  filterStatus = '';

  form = {
    name: '', description: '', status: 'active' as any,
    priority: 'medium' as any, color: '#6c63ff', dueDate: ''
  };

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    public auth: AuthService
  ) {}

  ngOnInit() { this.loadProjects(); }

  loadProjects() {
    const user = this.auth.getCurrentUser()!;
    let projects = this.projectService.getUserProjects(user.id, this.auth.isAdmin());
    if (this.filterStatus) {
      projects = projects.filter(p => p.status === this.filterStatus);
    }
    this.projects = projects.map(p => ({
      ...p,
      taskCount: this.taskService.getByProject(p.id).length,
      doneCount: this.taskService.getByProject(p.id).filter(t => t.status === 'done').length
    }));
  }

  openCreate() {
    this.editProject = null;
    this.form = { name: '', description: '', status: 'active', priority: 'medium', color: '#6c63ff', dueDate: '' };
    this.showForm = true;
  }

  openEdit(project: Project) {
    this.editProject = project;
    this.form = {
      name: project.name, description: project.description,
      status: project.status, priority: project.priority,
      color: project.color, dueDate: project.dueDate
    };
    this.showForm = true;
  }

  save() {
    if (!this.form.name.trim()) return;
    const user = this.auth.getCurrentUser()!;
    if (this.editProject) {
      this.projectService.update(this.editProject.id, this.form);
    } else {
      this.projectService.create({
        ...this.form,
        ownerId: user.id,
        ownerName: user.name,
        memberIds: []
      });
    }
    this.showForm = false;
    this.loadProjects();
  }

  delete(id: string) {
    if (confirm('Delete this project and all its tasks?')) {
      this.taskService.getByProject(id).forEach(t => this.taskService.delete(t.id));
      this.projectService.delete(id);
      this.loadProjects();
    }
  }

  getProgress(project: any): number {
    return project.taskCount > 0
      ? Math.round((project.doneCount / project.taskCount) * 100)
      : 0;
  }
}