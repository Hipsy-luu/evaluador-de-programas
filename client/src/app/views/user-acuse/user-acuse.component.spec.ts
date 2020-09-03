import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcuseComponent } from './user-acuse.component';

describe('UserAcuseComponent', () => {
  let component: UserAcuseComponent;
  let fixture: ComponentFixture<UserAcuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAcuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAcuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
