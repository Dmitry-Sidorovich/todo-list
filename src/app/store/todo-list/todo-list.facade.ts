import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import * as TodoListActions from './todo-list.actions';
import { TodoListState } from './todo-list.state';
import { ListItemInterface } from '../../interfaces/list-item.interface';

@Injectable()

export class TodoListFacade {

  @Select(TodoListState.allTodos)
  public allTodos$: Observable<ListItemInterface[]>;

  @Select(TodoListState.todos)
  public todos$: Observable<ListItemInterface[]>;

  @Select(TodoListState.progress)
  public progress$: Observable<ListItemInterface[]>;

  @Select(TodoListState.completed)
  public completed$: Observable<ListItemInterface[]>;


  constructor(private store: Store) {}

  addTodos(todo: ListItemInterface): void {
    this.store.dispatch(
      new TodoListActions.addTodo(todo)
    )
  }

  deleteTodo(id: string): void {
    this.store.dispatch(
      new TodoListActions.deleteTodo(id)
    )
  }

  editTodo(item: ListItemInterface): void {
    this.store.dispatch(
      new TodoListActions.editTodo(item)
    )
  }

  getFromLocalStorage() {
    this.store.dispatch(
      new TodoListActions.getFromLocalStorage()
    )
  }

  saveToLocalStorage() {
    this.store.dispatch(
      new TodoListActions.saveToLocalStore()
    )
  }

}
