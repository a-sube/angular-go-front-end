import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposPage } from './repos.page';

describe('ReposPage', () => {
  let component: ReposPage;
  let fixture: ComponentFixture<ReposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
