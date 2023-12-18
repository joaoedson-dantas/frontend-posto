import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppleyFormComponent } from './suppley-form.component';

describe('SuppleyFormComponent', () => {
  let component: SuppleyFormComponent;
  let fixture: ComponentFixture<SuppleyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppleyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppleyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
