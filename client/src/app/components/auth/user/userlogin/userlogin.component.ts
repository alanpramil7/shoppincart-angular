import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss',
})
export class UserloginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  login() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.userLogin(email, password).subscribe({
        next: (data: any) => {
          this.toastr.success('Logged in');
        },
        error: (error) => {
          this.toastr.error('Invalid credentials');
          console.log('Error while logging user', error);
        },
        complete: () => {
          this.router.navigate(['userpage']);
        },
      });
    }
  }
}
