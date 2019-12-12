import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteDetailComponent } from './transporte-detail.component';

describe('TransporteDetailComponent', () => {
  let component: TransporteDetailComponent;
  let fixture: ComponentFixture<TransporteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
