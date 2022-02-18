import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExerciseComponent } from './delete-exercise.component';

describe('DeleteExerciseComponent', () => {
  let component: DeleteExerciseComponent;
  let fixture: ComponentFixture<DeleteExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
