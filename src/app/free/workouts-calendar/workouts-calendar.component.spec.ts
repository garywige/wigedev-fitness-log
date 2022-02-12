import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsCalendarComponent } from './workouts-calendar.component';

describe('WorkoutsCalendarComponent', () => {
  let component: WorkoutsCalendarComponent;
  let fixture: ComponentFixture<WorkoutsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
