import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Howitwork } from './howitwork';

describe('Howitwork', () => {
  let component: Howitwork;
  let fixture: ComponentFixture<Howitwork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Howitwork]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Howitwork);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
