// @ts-ignore
import { v4 as uuidv } from 'uuid';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListItemInterface } from '../interfaces/list-item.interface';
import { DialogComponent } from '../components/todo-list/dialog/dialog.component';
import { HEIGHT_FOR_DIALOG, WIDTH_FOR_DIALOG } from '../constans/constants';
import { TodoListFacade } from '../store/todo-list/todo-list.facade';

@Injectable({
  providedIn: 'root'
})
export class OperationTodoService {

  constructor(
    private dialog: MatDialog,
    private todoListFacade: TodoListFacade) {
  }

  editTodo(item: ListItemInterface, items: ListItemInterface[]): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      height: HEIGHT_FOR_DIALOG,
      width: WIDTH_FOR_DIALOG,
      data: item
    })

    dialogRef.afterClosed().subscribe((todo) => {
      if (todo) {
        this.todoListFacade.editTodo(todo)
      }
    })
  }

}
