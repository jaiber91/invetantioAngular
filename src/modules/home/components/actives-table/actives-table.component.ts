import { Component, EventEmitter, Output } from '@angular/core';
import { Active } from '../../../../shared/models/active_model';
import { ActiveService } from '../../services/active.service';


@Component({
  selector: 'app-actives-table',
  templateUrl: './actives-table.component.html',
  styleUrl: './actives-table.component.scss',
})
export class ActivesTableComponent {
  @Output() edit = new EventEmitter<Active>();

  items: Active[] = [];
  nameFilter = '';
  filteredItems: Active[] = [];
  paginatedItems: Active[] = [];

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  currentSort: keyof Active = 'name';
  ascending = true;

  constructor(private activeService: ActiveService) {}

  ngOnInit(): void {
    this.activeService.getAll().subscribe((data) => {
      this.items = data;
      this.applyFiltersAndSort();
    });
  }

  filterItems(): void {
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  sortBy(field: keyof Active): void {
    if (this.currentSort === field) {
      this.ascending = !this.ascending;
    } else {
      this.currentSort = field;
      this.ascending = true;
    }
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    const filtered = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.nameFilter.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[this.currentSort];
      const valB = b[this.currentSort];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.ascending ? valA - valB : valB - valA;
      }

      return this.ascending
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    this.totalPages = Math.ceil(sorted.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredItems = sorted;
    this.paginatedItems = sorted.slice(start, start + this.itemsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFiltersAndSort();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyFiltersAndSort();
    }
  }

  editItem(item: Active): void {
    this.edit.emit(item);
  }
}

