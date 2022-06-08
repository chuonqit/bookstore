import { IUser } from './../../shared/models/User.model';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss'],
})
export class ManagerLayoutComponent implements OnInit {
  isCollapsed: boolean;
  currentUser: IUser | null;

  constructor(
    private authService: AuthService,
    private router$: Router,
    private message: NzMessageService
  ) {
    this.isCollapsed = false;
    this.currentUser = null;
  }

  logout() {
    this.authService.logout();
    this.router$.navigate(['/login']);
    this.message.create('success', 'Đăng xuất thành công');
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
  }
}
