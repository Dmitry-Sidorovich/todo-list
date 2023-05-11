import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListItemInterface } from '../interfaces/list-item.interface';
import { map } from 'rxjs/operators';
import { LOCAL_STORAGE_KEY } from '../constans/constants';
import { ElementType } from '../enums/enums';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public todos$: Observable<ListItemInterface[]>;
  public progress$: Observable<ListItemInterface[]>;
  public completed$: Observable<ListItemInterface[]>;
  private allTodos$: BehaviorSubject<ListItemInterface[]> = new BehaviorSubject<ListItemInterface[]>([])

  constructor() {
    this.sortList()
  }

  private sortList(): void {
    this.todos$ = this.getAllTodos$().pipe(
      map(
        (list) => list.filter(el => el.type === ElementType.todo)
      )
    );
    this.progress$ = this.getAllTodos$().pipe(
      map(
        (list) => list.filter(el => el.type === ElementType.progress)
      )
    );
    this.completed$ = this.getAllTodos$().pipe(
      map(
        (list) => list.filter(el => el.type === ElementType.completed)
      )
    );
  }

  public getAllTodos$(): BehaviorSubject<ListItemInterface[]> {
    return this.allTodos$
  }

  public getTodoList(): void {
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    this.allTodos$.next(storageData ? JSON.parse(storageData) : []);
  }

  public saveTodoList(data: ListItemInterface[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    this.getTodoList();
  }
}
