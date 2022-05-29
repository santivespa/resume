import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareerPathComponent } from './add-career-path.component';

describe('AddCareerPathComponent', () => {
  let component: AddCareerPathComponent;
  let fixture: ComponentFixture<AddCareerPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCareerPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCareerPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
