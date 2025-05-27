import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Active } from '../../../../shared/models/active_model';
import { ActiveService } from '../../services/active.service';


@Component({
  selector: 'app-actives-form',
  templateUrl: './actives-form.component.html',
  styleUrl: './actives-form.component.scss',
})
export class ActivesFormComponent implements OnInit, OnChanges {
  @Input() activeToEdit: Active | null = null;
  @Output() save = new EventEmitter<Active>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  editing = false;

  constructor(private fb: FormBuilder, private activeService: ActiveService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeToEdit'] && this.activeToEdit) {
      this.editing = true;
      this.form.patchValue(this.activeToEdit);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      value: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const active: Active = this.form.value;
      if (this.editing) {
        this.activeService.update(active);
      } else {
        this.activeService.create(active);
      }
      this.save.emit(active);
      this.form.reset();
      this.editing = false;
    }
  }

  cancelEdit(): void {
    this.cancel.emit();
    this.form.reset();
    this.editing = false;
  }
}
