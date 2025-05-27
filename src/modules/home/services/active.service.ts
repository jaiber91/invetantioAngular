import { Injectable } from '@angular/core';
import { ActiveModel } from '../../../shared/models/active_model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  //TODO: MOVER A UN .ENV O ARCHIVO GLOBAL
  private readonly API_URL = 'http://localhost:3000/api/asset-management';
  private itemsSubject = new BehaviorSubject<ActiveModel[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<ActiveModel[]> {
    return this.http.get<{ message: string; data: any[] }>(this.API_URL).pipe(
      map((response) => response.data.map((item) => this.mapToActive(item))),
      tap((actives) => this.itemsSubject.next(actives)),
      catchError((error) => {
        console.error('Error al obtener activos:', error);
        return of([]);
      })
    );
  }

  create(active: ActiveModel): Observable<any> {
    const payload = {
      name: active.name,
      description: active.description,
      value: active.value,
    };
    return this.http.post(this.API_URL, payload).pipe(
      tap(() => this.getAll().subscribe()),
      catchError((error) => {
        console.error('Error al crear activo:', error);
        return of(null);
      })
    );
  }

  update(active: ActiveModel): Observable<any> {
    return this.http
      .put(`${this.API_URL}/${active.id}`, {
        name: active.name,
        description: active.description,
        value: active.value,
      })
      .pipe(
        tap(() => this.getAll().subscribe()),
        catchError((error) => {
          console.error('Error al actualizar activo:', error);
          return of(null);
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      tap(() => this.getAll().subscribe()),
      catchError((error) => {
        console.error('Error al eliminar activo:', error);
        return of(null);
      })
    );
  }

  getById(id: number): Observable<ActiveModel | undefined> {
    return this.http
      .get<{ message: string; data: any }>(`${this.API_URL}/${id}`)
      .pipe(
        map((response) => this.mapToActive(response.data)),
        catchError((error) => {
          console.error(`Error al obtener activo con ID ${id}:`, error);
          return of(undefined);
        })
      );
  }
  private mapToActive(item: any): ActiveModel {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      value: +item.value,
    };
  }
}
