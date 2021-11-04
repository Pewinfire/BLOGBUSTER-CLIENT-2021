import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPostComponent } from './dialogo-post.component';

describe('DialogoPostComponent', () => {
  let component: DialogoPostComponent;
  let fixture: ComponentFixture<DialogoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
