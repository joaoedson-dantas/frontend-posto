import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSettingsHomeComponent } from './global-settings-home.component';

describe('GlobalSettingsHomeComponent', () => {
  let component: GlobalSettingsHomeComponent;
  let fixture: ComponentFixture<GlobalSettingsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSettingsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSettingsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
