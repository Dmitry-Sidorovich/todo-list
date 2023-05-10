import { TODO_LIST_STATE_KEY } from './todo-list.model';
import { ListItemInterface } from '../../interfaces/list-item.interface';

export class getFromLocalStorage {
  static readonly type = `[${TODO_LIST_STATE_KEY}] get from local store`;
}

export class saveToLocalStore {
  static readonly type = `[${TODO_LIST_STATE_KEY}] save to local store`;
}

export class addTodo {
  static readonly  type = `[${TODO_LIST_STATE_KEY}] add todo`;
  constructor(public payload: ListItemInterface) {}
}

export class deleteTodo {
  static readonly type = `[${TODO_LIST_STATE_KEY}] delete todo`;
   constructor(public payload: string) {}
}

export class editTodo {
  static readonly type = `[${TODO_LIST_STATE_KEY}] edit todo`;
  constructor(public payload: ListItemInterface) {
  }
}
