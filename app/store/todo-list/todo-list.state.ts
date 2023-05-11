import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { append, insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { LOCAL_STORAGE_KEY } from 'src/app/constans/constants';
import { ElementType } from 'src/app/enums/enums';
import { TODO_LIST_STATE_KEY, TodoListStateModel } from './todo-list.model';
import { ListItemInterface } from '../../interfaces/list-item.interface';
import * as todoListActions from './todo-list.actions';


@State<TodoListStateModel>({
  name: TODO_LIST_STATE_KEY,
  defaults: {
    items: [],
    loading: false,
  },
})

@Injectable()
export class TodoListState {

  @Selector()
  static allTodos(state: TodoListStateModel): ListItemInterface[] {
    return state.items;
  }

  @Selector()
  static todos(state: TodoListStateModel): ListItemInterface[] {
    return state.items.filter(el => el.type === ElementType.todo);
  }

  @Selector()
  static progress(state: TodoListStateModel): ListItemInterface[] {
    return state.items.filter(el => el.type === ElementType.progress);
  }

  @Selector()
  static completed(state: TodoListStateModel): ListItemInterface[] {
    return state.items.filter(el => el.type === ElementType.completed);
  }


  @Action(todoListActions.saveToLocalStore)
  public saveToLocalStore(
    ctx: StateContext<TodoListStateModel>,
    action: todoListActions.saveToLocalStore
  ) {
    const todos = ctx.getState().items;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }


  @Action(todoListActions.getFromLocalStorage)
  public getFromLocalStorage(
    ctx: StateContext<TodoListStateModel>,
    action: todoListActions.getFromLocalStorage
  ) {
    const data = JSON.parse(<string>localStorage.getItem(LOCAL_STORAGE_KEY))

    ctx.setState(
      patch({
        items: append(data)
      })
    );
  }


  @Action(todoListActions.addTodo)
  addTodo(
    ctx: StateContext<TodoListStateModel>,
    action: todoListActions.addTodo
  ) {
    ctx.setState(
      patch({
        items: insertItem(action.payload)
      })
    );

    return ctx.dispatch(new todoListActions.saveToLocalStore());
  }


  @Action(todoListActions.deleteTodo)
  deleteTodo(
    ctx: StateContext<TodoListStateModel>,
    action: todoListActions.deleteTodo
  ) {
    ctx.setState(
      patch({
        items: removeItem<any>((todo) => todo.id === action.payload)
      })
    );
    return ctx.dispatch(new todoListActions.saveToLocalStore());
  }


  @Action(todoListActions.editTodo)
  editTodo(
    ctx: StateContext<TodoListStateModel>,
    action: todoListActions.editTodo
  ) {
    ctx.setState(
      patch({
        items: updateItem<any>(todo => todo.id === action.payload.id, action.payload)
      })
    )
    return ctx.dispatch(new todoListActions.saveToLocalStore());
  };

}

