import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanksHomeComponent } from './tanks-home.component';

describe('TanksHomeComponent', () => {
  let component: TanksHomeComponent;
  let fixture: ComponentFixture<TanksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TanksHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TanksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
