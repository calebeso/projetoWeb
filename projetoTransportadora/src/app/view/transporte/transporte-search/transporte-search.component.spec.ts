import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteSearchComponent } from './transporte-search.component';

describe('TransporteSearchComponent', () => {
  let component: TransporteSearchComponent;
  let fixture: ComponentFixture<TransporteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
