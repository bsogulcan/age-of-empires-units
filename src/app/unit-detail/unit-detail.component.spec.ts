import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailComponent } from './unit-detail.component';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
