import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { DialogComponent } from './components/todo-list/dialog/dialog.component';
import { ItemComponent } from './components/todo-list/item/item.component';
import { ListComponent } from './components/todo-list/list/list.component';
import { MaterialModule } from './modules/material/material.module';
import { TodoListState } from './store/todo-list/todo-list.state';
import { TodoListFacade } from './store/todo-list/todo-list.facade';
import { CalendarComponent } from './components/todo-list/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ItemComponent,
    ListComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    NgxsModule.forRoot([TodoListState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [TodoListFacade],
  bootstrap: [AppComponent]
})
export class AppModule {
}
