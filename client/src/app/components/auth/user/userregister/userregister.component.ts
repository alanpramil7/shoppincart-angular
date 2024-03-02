import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrl: './userregister.component.scss',
})
export class UserregisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  register() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      const isAdmin = false;
      this.userService
        .adminRegister(username, email, password, isAdmin)
        .subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: (error) => {
            console.log('Error while logging user', error);
          },
          complete: () => {
            this.router.navigate(['login/user']);
          },
        });
    }
  }
}
