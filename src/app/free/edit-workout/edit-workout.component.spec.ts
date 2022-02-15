import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkoutComponent } from './edit-workout.component';

describe('EditWorkoutComponent', () => {
  let component: EditWorkoutComponent;
  let fixture: ComponentFixture<EditWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
