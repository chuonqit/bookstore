import { IUser } from './../../../../shared/models/User.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input('currentUser') currentUser: IUser | null = null;
  @Input('cartTotal') cartTotal: number = 0;
  @Output('logout') onLogout: EventEmitter<any> = new EventEmitter();

  logout() {
    this.onLogout.emit();
  }
}
