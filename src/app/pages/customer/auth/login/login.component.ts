import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router$: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private title$: Title
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/\S+@\S+\.\S+/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
    });
  }

  ngOnInit(): void {
    this.title$.setTitle('Đăng nhập - Bookstore');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          const pathNavigate = response.user.isAdmin ? '/manager' : '/';
          this.message.create('success', 'Đăng nhập thành công');
          this.router$.navigateByUrl(pathNavigate);
        },
        (error) => {
          this.message.create('error', error.error);
        }
      );
    }
  }
}
