import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookDetailsComponent } from './update-book-details.component';

describe('UpdateBookDetailsComponent', () => {
  let component: UpdateBookDetailsComponent;
  let fixture: ComponentFixture<UpdateBookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBookDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
