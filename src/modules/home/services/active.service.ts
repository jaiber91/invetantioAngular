import { Injectable } from '@angular/core';
import { Active } from '../../../shared/models/active_model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  private _items: Active[] = [
    { id: 1, name: 'Laptop', description: 'Dell XPS', value: 3000 },
    { id: 2, name: 'Monitor', description: 'LG 27"', value: 1200 },
    { id: 3, name: 'Keyboard', description: 'Mechanical', value: 300 },
  ];

  private itemsSubject = new BehaviorSubject<Active[]>([...this._items]);
  items$ = this.itemsSubject.asObservable();

  getAll(): Observable<Active[]> {
    return this.items$;
  }

  create(active: Active): void {
    const newItem = { ...active, id: this.generateId() };
    this._items.push(newItem);
    this.itemsSubject.next([...this._items]);
  }

  update(active: Active): void {
    const index = this._items.findIndex((i) => i.id === active.id);
    if (index !== -1) {
      this._items[index] = active;
      this.itemsSubject.next([...this._items]);
    }
  }

  delete(id: number): void {
    this._items = this._items.filter((i) => i.id !== id);
    this.itemsSubject.next([...this._items]);
  }

  private generateId(): number {
    return this._items.length
      ? Math.max(...this._items.map((i) => i.id || 0)) + 1
      : 1;
  }

  getById(id: number): Active | undefined {
    return this._items.find((i) => i.id === id);
  }
}
