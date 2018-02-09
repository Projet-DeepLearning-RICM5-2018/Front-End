import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldComponent } from './admin-field.component';

describe('AdminFieldComponent', () => {
  let component: AdminFieldComponent;
  let fixture: ComponentFixture<AdminFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
