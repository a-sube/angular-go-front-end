import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoDetailPage } from './repo-detail.page';

describe('RepoDetailPage', () => {
  let component: RepoDetailPage;
  let fixture: ComponentFixture<RepoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
