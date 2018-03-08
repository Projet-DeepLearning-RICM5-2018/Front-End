import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParamsComponent } from './my-params.component';

describe('MyParamsComponent', () => {
  let component: MyParamsComponent;
  let fixture: ComponentFixture<MyParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
