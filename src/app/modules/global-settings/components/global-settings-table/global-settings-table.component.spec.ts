import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSettingsTableComponent } from './global-settings-table.component';

describe('GlobalSettingsTableComponent', () => {
  let component: GlobalSettingsTableComponent;
  let fixture: ComponentFixture<GlobalSettingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalSettingsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalSettingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
