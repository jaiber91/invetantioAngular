import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActiveModel } from '../../../../shared/models/active_model';
import { ActiveService } from '../../services/active.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-actives-form',
  templateUrl: './actives-form.component.html',
  styleUrl: './actives-form.component.scss',
})
export class ActivesFormComponent implements OnInit {
  @Output() save = new EventEmitter<ActiveModel>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  editing = false;

  @ViewChild('nameInput') nameInputRef!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private activeService: ActiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.activeService.getById(+id);
      if (found) {
        this.editing = true;
        this.form.patchValue(found);
      }
    }
  }
  private _activeToEdit: ActiveModel | null = null;

  @Input()
  set activeToEdit(value: ActiveModel | null) {
    this._activeToEdit = value;

    if (value) {
      this.editing = true;
      this.form.patchValue(value);

      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
        control?.markAsDirty();
        control?.updateValueAndValidity();
      });

      setTimeout(() => {
        this.nameInputRef?.nativeElement?.focus();
      }, 0);
    }
  }

  get activeToEdit(): ActiveModel | null {
    return this._activeToEdit;
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
      const active: ActiveModel = this.form.value;
      if (this.editing) {
        this.activeService.update(active);
      } else {
        this.activeService.create(active);
      }

      this.save.emit(active);
      this.form.reset();
      this.editing = false;

      this.router.navigate(['/home/table']);
    }
  }

  cancelEdit(): void {
    this.cancel.emit();
    this.form.reset();
    this.editing = false;
  }
}
