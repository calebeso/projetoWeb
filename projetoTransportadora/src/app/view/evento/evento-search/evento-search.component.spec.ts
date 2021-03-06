import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoSearchComponent } from './evento-search.component';

describe('EventoSearchComponent', () => {
  let component: EventoSearchComponent;
  let fixture: ComponentFixture<EventoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
