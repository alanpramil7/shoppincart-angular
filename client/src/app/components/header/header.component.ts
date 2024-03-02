import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  user: any;

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUser().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (error) => {
        console.log('Error on getting user details', error);
      },
    });
  }

  logout() {
    this.userService.logout().subscribe({
      next: (data) => {
        console.log('Logged out sucessfully');
      },
      error: (e) => {
        console.log('Error while logging out', e);
      },
      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }

  navigate() {
    if (this.user.isAdmin) {
      this.router.navigate(['adminpage']);
    }
    if (!this.user.isAdmin) {
      this.router.navigate(['userpage']);
    }
    if (!this.user) {
      this.router.navigate(['']);
    }
  }
}
