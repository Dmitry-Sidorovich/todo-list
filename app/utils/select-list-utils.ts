import { ListItemInterface } from '../interfaces/list-item.interface';
import { ElementType } from '../enums/enums';
import { TodoListFacade } from '../store/todo-list/todo-list.facade';


export const selectList = ({
  allTodos,
  listId,
  data,
  facade,
}: {
  facade: TodoListFacade
  allTodos: ListItemInterface[],
  listId: string,
  data: ListItemInterface,
}): ListItemInterface[] => {

  const item = allTodos.find((element: ListItemInterface) => element.id === data.id);

  if (!item) {
    return [];
  }

  switch (listId) {

    case 'list-progress': {
      facade.editTodo({...item, type: ElementType.progress})
      break;
    }

    case 'list-completed': {
      facade.editTodo({...item, type: ElementType.completed})
      break;
    }

    default: {
      facade.editTodo({...item, type: ElementType.todo})
    }
  }
  return allTodos
}
