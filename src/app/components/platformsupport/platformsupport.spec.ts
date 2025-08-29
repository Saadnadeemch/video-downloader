import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Platformsupport } from './platformsupport';

describe('Platformsupport', () => {
  let component: Platformsupport;
  let fixture: ComponentFixture<Platformsupport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Platformsupport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Platformsupport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
