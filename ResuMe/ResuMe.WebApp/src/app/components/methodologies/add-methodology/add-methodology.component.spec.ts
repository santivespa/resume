import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMethodologyComponent } from './add-methodology.component';

describe('AddMethodologyComponent', () => {
  let component: AddMethodologyComponent;
  let fixture: ComponentFixture<AddMethodologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMethodologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
