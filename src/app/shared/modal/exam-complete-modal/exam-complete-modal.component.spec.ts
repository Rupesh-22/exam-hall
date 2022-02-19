import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCompleteModalComponent } from './exam-complete-modal.component';

describe('ExamCompleteModalComponent', () => {
  let component: ExamCompleteModalComponent;
  let fixture: ComponentFixture<ExamCompleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCompleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
