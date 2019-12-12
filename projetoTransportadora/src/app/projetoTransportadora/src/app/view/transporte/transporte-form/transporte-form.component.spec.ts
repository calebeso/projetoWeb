import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteFormComponent } from './transporte-form.component';

describe('TransporteFormComponent', () => {
  let component: TransporteFormComponent;
  let fixture: ComponentFixture<TransporteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
