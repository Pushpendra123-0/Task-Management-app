import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm = false;
  form = { name: '', email: '', password: '', role: 'member' as any };
  error = '';

  constructor(public auth: AuthService) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() { this.users = this.auth.getUsers(); }

  save() {
    if (!this.form.name || !this.form.email || !this.form.password) {
      this.error = 'All fields are required.';
      return;
    }
    const success = this.auth.addUser(this.form);
    if (success) {
      this.showForm = false;
      this.form = { name: '', email: '', password: '', role: 'member' };
      this.error = '';
      this.loadUsers();
    } else {
      this.error = 'Email already exists.';
    }
  }

  delete(id: string) {
    if (id === this.auth.getCurrentUser()?.id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (confirm('Delete this user?')) {
      this.auth.deleteUser(id);
      this.loadUsers();
    }
  }
}