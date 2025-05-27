import { Component } from '@angular/core';
import { Active } from '../../../../shared/models/active_model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  mostrarFormulario = false;
  activeToEdit: Active | null = null;

  toggleForm(): void {
    this.mostrarFormulario = true;
    this.activeToEdit = null;
  }

  toggleTable(): void {
    this.mostrarFormulario = false;
  }

  onSaveActive(active: Active): void {
    console.log('Saved:', active);
    this.mostrarFormulario = false;
  }

  onCancelForm(): void {
    this.mostrarFormulario = false;
  }

  onEditActive(active: Active): void {
    this.activeToEdit = active;
    this.mostrarFormulario = true;
  }
}
