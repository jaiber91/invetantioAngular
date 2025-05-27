import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivesFormComponent } from './actives-form.component';

describe('ActivesFormComponent', () => {
  let component: ActivesFormComponent;
  let fixture: ComponentFixture<ActivesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
