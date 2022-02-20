import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/common/testing/testing.module';

import { WorkoutsCalendarComponent } from './workouts-calendar.component';

describe('WorkoutsCalendarComponent', () => {
  let component: WorkoutsCalendarComponent;
  let fixture: ComponentFixture<WorkoutsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutsCalendarComponent],
      imports: [TestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('generateCalendar()', () => {
    beforeEach(() => {
      component.generateCalendar();
    });

    it('should should populate weeks array', () => {
      expect(component.weeks.length).toBeGreaterThan(0);
    });
  });
});
