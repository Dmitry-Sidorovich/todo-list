import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { TodoListFacade } from 'src/app/store/todo-list/todo-list.facade';
// @ts-ignore
import { v4 as uuidv } from 'uuid';
import { HEIGHT_FOR_CALENDAR, WIDTH_FOR_CALENDAR } from '../../../constans/constants';
import { ListItemInterface } from '../../../interfaces/list-item.interface';
import { FormGroupService } from '../../../services/form-group.service';
import { OperationTodoService } from '../../../services/operation-todo.service';
import { selectList } from '../../../utils/select-list-utils';
import { CalendarComponent } from '../calendar/calendar.component';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public todos$: Observable<ListItemInterface[]>;
  public progress$: Observable<ListItemInterface[]>;
  public completed$: Observable<ListItemInterface[]>;
  public listFormGroup: FormGroup;

  private destroySubject$: Subject<void> = new Subject<void>();
  private allTodos: ListItemInterface[];

  constructor(
    private operationTodoService: OperationTodoService,
    private formGroupService: FormGroupService,
    private dialog: MatDialog,
    private todoListFacade: TodoListFacade) {
  }

  ngOnInit(): void {
    this.todoListFacade.getFromLocalStorage();
    this.todos$ = this.todoListFacade.todos$;
    this.progress$ = this.todoListFacade.progress$;
    this.completed$ = this.todoListFacade.completed$;
    this.todoListFacade.allTodos$.pipe(takeUntil(this.destroySubject$)).subscribe((allTodos) => {
      this.allTodos = allTodos
    })
    this.listFormGroup = this.formGroupService.initFormGroup();
  }

  addTodo(): void {
    const todo = this.listFormGroup.value;
    this.todoListFacade.addTodos(todo);
    this.listFormGroup = this.formGroupService.initFormGroup();
  }

  deleteTodo(item: ListItemInterface): void {
    this.todoListFacade.deleteTodo(item.id)
  }

  editTodo(item: ListItemInterface): void {
    this.operationTodoService.editTodo(item, this.allTodos);
  }


  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      selectList({
        allTodos: this.allTodos,
        listId: event.container.id,
        data: event.item.data,
        facade: this.todoListFacade,
      });
    }
  }

  openCalendar() {
    this.dialog.open(CalendarComponent, {
      height: HEIGHT_FOR_CALENDAR,
      width: WIDTH_FOR_CALENDAR,
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  identify(index: number, item: ListItemInterface): string {
    return item.id;
  }

}
