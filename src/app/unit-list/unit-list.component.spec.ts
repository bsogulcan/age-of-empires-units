import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitListComponent } from './unit-list.component';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { UnitService } from '../services/unit/unit.service';
import { of } from 'rxjs';
import { Unit } from '../services/unit/dtos/unit';
import { Store } from '@ngrx/store';
import { UnitDto } from '../services/unit/dtos/unit-dto';
import { Router } from '@angular/router';

describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;
  let unitService: jasmine.SpyObj<UnitService>;
  let units: Unit[];
  let store: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    units = [
      {
        id: 1,
        name: 'Archer',
        description:
          'Quick and light. Weak at close range; excels at battle from distance',
        expansion: 'Age of Kings',
        age: 'Feudal',
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 35,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 6,
        hit_points: 4,
        range: 30,
        attack: 4,
        armor: '0/0',
        accuracy: '80%',
      },
      {
        id: 2,
        name: 'Crossbowman',
        description: 'Upgraded archer',
        expansion: 'Age of Kings',
        age: 'Castle',
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 7,
        hit_points: 35,
        range: 5,
        attack: 5,
        armor: '0/0',
        attack_bonus: ['+3 spearmen'],
        accuracy: '85%',
      },
      {
        id: 28,
        name: 'Fire Ship',
        description:
          'Spews fire at other ships. Good at sinking galleys. Attack shows pierce attack',
        expansion: 'Age of Kings',
        age: 'Castle',
        cost: {
          Wood: 75,
          Gold: 45,
        },
        build_time: 36,
        reload_time: 0.25,
        movement_rate: 1.35,
        line_of_sight: 5,
        hit_points: 100,
        range: 2.49,
        attack: 2,
        armor: '0/6',
        attack_bonus: [
          '+2 buildings',
          '+3 ships/camels',
          '+2 turtle ships',
          '+1 melee',
        ],
        armor_bonus: ['+5 ships/camel'],
      },
      {
        id: 78,
        name: 'Elite Huskarl',
        description: 'Upgraded Huskarl',
        expansion: 'Age of Kings',
        age: 'Imperial',
        cost: {
          Food: 52,
          Gold: 26,
        },
        build_time: 16,
        reload_time: 2,
        movement_rate: 1.05,
        line_of_sight: 5,
        hit_points: 70,
        attack: 12,
        armor: '0/8',
        attack_bonus: [
          '+3 eagles',
          '+3 buildings',
          '+10 archers/hand cannoneers',
        ],
      },
    ];
    unitService = jasmine.createSpyObj('UnitService', ['getList']);
    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    unitService.getList.and.returnValue(
      of({
        units,
      }),
    );
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, UnitListComponent],
      providers: [
        { provide: UnitService, useValue: unitService },
        { provide: Store, useValue: store },
        { provide: Router, useValue: mockRouter },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitListComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of([]));

    fixture.detectChanges(); // This should trigger ngOnInit and related lifecycle hooks
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    const title = component.titleService.getTitle();
    expect(title).toBe('Units | Age of Empires');
  });

  it('should fetch units and set up subscriptions', () => {
    expect(unitService.getList).toHaveBeenCalled();
    expect(component.units).toEqual(units);
  });

  it('should unsubscribe from all subscriptions', () => {
    spyOn(component.service$, 'unsubscribe');
    spyOn(component.filteredUnits$, 'unsubscribe');
    spyOn(component.ageFilter$, 'unsubscribe');
    spyOn(component.costFilters$, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.service$.unsubscribe).toHaveBeenCalled();
    expect(component.filteredUnits$.unsubscribe).toHaveBeenCalled();
    expect(component.ageFilter$.unsubscribe).toHaveBeenCalled();
    expect(component.costFilters$.unsubscribe).toHaveBeenCalled();
  });

  it('should navigate to unit description', () => {
    const unit = component.units[0];
    component.units = [unit];
    const mockUnitDto: UnitDto = {
      id: unit.id,
      name: unit.name,
      age: unit.age,
      costs: 'cost',
    };

    component.navigateUnitDescription(mockUnitDto);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/unit/', unit.id]);
  });

  it('should not navigate to unit description', () => {
    const mockUnitDto: UnitDto = {
      id: -1,
      name: 'non existing unit',
      age: 'age',
      costs: 'cost',
    };

    component.navigateUnitDescription(mockUnitDto);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
