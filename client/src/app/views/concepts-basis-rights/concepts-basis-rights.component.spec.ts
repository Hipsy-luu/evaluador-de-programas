import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsBasisRightsComponent } from './concepts-basis-rights.component';

describe('ConceptsBasisRightsComponent', () => {
  let component: ConceptsBasisRightsComponent;
  let fixture: ComponentFixture<ConceptsBasisRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptsBasisRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptsBasisRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
