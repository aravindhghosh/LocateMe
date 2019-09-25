import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationtabPage } from './navigationtab.page';

describe('NavigationtabPage', () => {
  let component: NavigationtabPage;
  let fixture: ComponentFixture<NavigationtabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationtabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationtabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
