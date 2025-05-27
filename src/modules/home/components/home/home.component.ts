import { Component } from '@angular/core';
import { ActiveModel } from '../../../../shared/models/active_model';
import { Router } from '@angular/router';
import { isSidebarOpen } from '../../../../shared/stores/layout.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  sidebarOpen = isSidebarOpen;
}
