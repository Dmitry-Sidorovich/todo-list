import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListItemInterface } from '../../../interfaces/list-item.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public dialogForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ListItemInterface,
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder) {
    this.initDialogForm()
  }

  private initDialogForm(): void {
    this.dialogForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      text: [this.data.text, [Validators.required]]
    })
  }

  editTodo(): void {
    const todo: ListItemInterface = {
      title: this.dialogForm.controls['title'].value,
      text: this.dialogForm.controls['text'].value,
      type: this.data.type,
      id: this.data.id,
      date: this.data.date
    }
    this.dialogRef.close(todo)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
