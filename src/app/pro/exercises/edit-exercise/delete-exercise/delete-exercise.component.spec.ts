import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/common/testing/testing.module';

import { DeleteExerciseComponent } from './delete-exercise.component';

describe('DeleteExerciseComponent', () => {
  let component: DeleteExerciseComponent;
  let fixture: ComponentFixture<DeleteExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteExerciseComponent],
      imports: [TestingModule],
    }).compileComponents();
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
