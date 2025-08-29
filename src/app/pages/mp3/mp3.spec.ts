import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mp3 } from './mp3';

describe('Mp3', () => {
  let component: Mp3;
  let fixture: ComponentFixture<Mp3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mp3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mp3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
