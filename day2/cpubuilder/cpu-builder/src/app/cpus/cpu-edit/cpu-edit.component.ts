import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app.reducer';
import * as CpusActions from '../store/cpu.actions';

@Component({
  selector: 'app-cpu-edit',
  templateUrl: './cpu-edit.component.html',
  styleUrls: ['./cpu-edit.component.css']
})
export class CpuEditComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  // storeSub!: Subscription;
  cpuForm!: FormGroup;
  editMode: boolean = false;

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let parts = this.fb.array([]);

    if (this.editMode) {
      // prepopulation..
    }

    this.cpuForm = this.fb.group({
      name: [name, Validators.required],
      imagePath: [imagePath, Validators.required],
      description: [description, Validators.required],
      parts
    })

  }

  ngOnInit(): void {
    this.initForm();
  }

  onCancel() {

  }

  onSubmit() {
    if (this.editMode) {
      // perform update!
    } else {
      this.store.dispatch(new CpusActions.AddCpu(this.cpuForm.value));
    }
  }

}
