import { Title } from '@angular/platform-browser';
import { AuthService } from './../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router$: Router,
    private authService: AuthService,
    private message: NzMessageService,
    private title$: Title
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    this.title$.setTitle('Đăng ký - Bookstore');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        () => {
          this.message.create('success', 'Đăng ký thành công');
          this.router$.navigateByUrl('/login');
        },
        (error) => {
          this.message.create('error', error.error);
        }
      );
    }
  }
}
