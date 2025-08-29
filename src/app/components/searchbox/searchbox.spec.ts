import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchbox } from './searchbox';

describe('Searchbox', () => {
  let component: Searchbox;
  let fixture: ComponentFixture<Searchbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
