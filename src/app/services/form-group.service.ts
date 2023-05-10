import { Injectable } from '@angular/core';
// @ts-ignore
import { v4 as uuidv } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ListItemInterface } from '../interfaces/list-item.interface';


@Injectable({
  providedIn: 'root'
})
export class FormGroupService {

  constructor(
    private fb: FormBuilder) {
  }

  public initFormGroup(data?: ListItemInterface): FormGroup {
    const form = this.fb.group({
      id: [data ? data.id : uuidv()],
      date: new Date(),
      type: ['todo', [Validators.required]],
      title: [null, [Validators.required, Validators.minLength(4)]],
      text: [null, [Validators.required, Validators.minLength(4)]],
    });
    if (data) {
      form.setValue(data);
    }
    return form
  }

}
