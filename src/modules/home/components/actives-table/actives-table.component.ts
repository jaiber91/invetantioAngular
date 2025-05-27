import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActiveModel } from '../../../../shared/models/active_model';
import { ActiveService } from '../../services/active.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actives-table',
  templateUrl: './actives-table.component.html',
  styleUrl: './actives-table.component.scss',
})
export class ActivesTableComponent {
  @Output() edit = new EventEmitter<ActiveModel>();

  displayedColumns: string[] = ['name', 'description', 'value', 'actions'];
  dataSource = new MatTableDataSource<ActiveModel>();
  nameFilter = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activeService: ActiveService, private router: Router) {}

  ngOnInit(): void {
    this.activeService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.nameFilter.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(item: ActiveModel): void {
    this.router.navigate(['home', 'editar', item.id]);
  }
}

