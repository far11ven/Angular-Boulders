import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueMemberItemComponent } from './due-member-item.component';

describe('DueMemberItemComponent', () => {
  let component: DueMemberItemComponent;
  let fixture: ComponentFixture<DueMemberItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueMemberItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueMemberItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
