import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './users.html'
})
export class Users implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  error = '';

  searchTerm = '';
  sortAsc = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  sortByName() {
    this.sortAsc = !this.sortAsc;
    this.filteredUsers.sort((a, b) =>
      this.sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  sortByCompany() {
    this.sortAsc = !this.sortAsc;
    this.filteredUsers.sort((a, b) =>
      this.sortAsc
        ? a.company.name.localeCompare(b.company.name)
        : b.company.name.localeCompare(a.company.name)
    );
  }
}