import { Component } from '@angular/core';
import { isSidebarOpen } from '../../stores/layout.store';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../modules/auth/services/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  sidebarOpen = isSidebarOpen;
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
