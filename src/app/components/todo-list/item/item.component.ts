import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemInterface } from '../../../interfaces/list-item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent  {

  @Input() item: ListItemInterface;

  @Output() onDelete: EventEmitter<ListItemInterface> = new EventEmitter<ListItemInterface>();

  @Output() onEdit: EventEmitter<ListItemInterface> = new EventEmitter<ListItemInterface>();

}
