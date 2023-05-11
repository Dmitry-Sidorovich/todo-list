import { ListItemInterface } from '../../interfaces/list-item.interface';

export const TODO_LIST_STATE_KEY = 'todoListState'

export interface TodoListStateModel {
  items: ListItemInterface[],
  loading: boolean,
}
