import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorkoutComponent } from './delete-workout.component';

describe('DeleteWorkoutComponent', () => {
  let component: DeleteWorkoutComponent;
  let fixture: ComponentFixture<DeleteWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteWorkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
