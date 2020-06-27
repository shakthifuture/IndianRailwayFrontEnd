import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationRegisterComponent } from './station-register.component';

describe('StationRegisterComponent', () => {
  let component: StationRegisterComponent;
  let fixture: ComponentFixture<StationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
