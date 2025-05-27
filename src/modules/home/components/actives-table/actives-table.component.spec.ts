import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivesTableComponent } from './actives-table.component';

describe('ActivesTableComponent', () => {
  let component: ActivesTableComponent;
  let fixture: ComponentFixture<ActivesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
