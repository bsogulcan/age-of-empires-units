import { TestBed } from '@angular/core/testing';
import { UnitService } from './unit.service';
import { Unit } from './dtos/unit';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';

describe('UnitService', () => {
  let service: UnitService;
  let archer: Unit;
  let units: Unit[];
  let nonExistUnit;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    archer = {
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
    };
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

    nonExistUnit = {
      id: -1,
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
    };
    service = TestBed.inject(UnitService);
    httpMock = TestBed.inject<HttpTestingController>(
      HttpTestingController as Type<HttpTestingController>,
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable units', () => {
    service.getList().subscribe((response) => {
      expect(response.units).toEqual(units);
    });

    const req = httpMock.expectOne('database.json');
    req.flush({ units: units });
  });

  it('should convert unit to unit dto', () => {
    const archerDto = UnitService.convertToUnitDto(archer);
    expect(archerDto).toEqual({
      id: 1,
      name: 'Archer',
      age: 'Feudal',
      costs: 'Wood: 25, Gold: 45',
    });
  });

  it('should stringify costs', () => {
    let cost = UnitService.stringifyCosts({});
    expect(cost).toBe('~');

    cost = UnitService.stringifyCosts(undefined);
    expect(cost).toBe('~');

    cost = UnitService.stringifyCosts({ Food: 10 });
    expect(cost).toBe('Food: 10');

    cost = UnitService.stringifyCosts({ Food: 10, Wood: 15 });
    expect(cost).toBe('Food: 10, Wood: 15');

    cost = UnitService.stringifyCosts({ Gold: 20 });
    expect(cost).toBe('Gold: 20');
  });

  it('should filter units', () => {
    let filteredUnits = UnitService.filterUnits(units, 'All', []);
    expect(filteredUnits).toEqual(units);

    filteredUnits = UnitService.filterUnits(units, 'Imperial', []);
    expect(filteredUnits.length).toBe(1);
    expect(filteredUnits[0]).toEqual(units[units.length - 1]);

    filteredUnits = UnitService.filterUnits(units, 'Castle', []);
    expect(filteredUnits.length).toBe(2);
    expect(filteredUnits).toEqual([units[1], units[2]]);

    filteredUnits = UnitService.filterUnits(units, 'Castle', [
      {
        type: 'wood',
        enabled: true,
        min: 55,
        displayName: '',
        max: 200,
      },
    ]);
    expect(filteredUnits.length).toBe(1);
    expect(filteredUnits).toEqual([units[2]]);

    filteredUnits = UnitService.filterUnits(units, 'All', [
      {
        type: 'wood',
        enabled: true,
        min: 20,
        displayName: '',
        max: 120,
      },
      {
        type: 'gold',
        enabled: true,
        min: 30,
        displayName: '',
        max: 100,
      },
    ]);
    expect(filteredUnits.length).toBe(3);
    expect(filteredUnits).toEqual([units[0], units[1], units[2]]);

    filteredUnits = UnitService.filterUnits(units, 'All', [
      {
        type: 'food',
        enabled: true,
        min: 20,
        displayName: '',
        max: 120,
      },
    ]);

    expect(filteredUnits.length).toBe(1);
    expect(filteredUnits).toEqual([units[3]]);
  });

  it('should find previous unit', () => {
    let previousUnit = UnitService.findPreviousUnit([...units], nonExistUnit!);
    expect(previousUnit).toBeFalsy();

    previousUnit = UnitService.findPreviousUnit([...units], units[0]);
    expect(previousUnit).toBeFalsy();

    previousUnit = UnitService.findPreviousUnit([...units], units[1]);
    expect(previousUnit).toEqual(units[0]);
    expect(previousUnit!.id).toEqual(units[0].id);
  });

  it('should find next unit', () => {
    let nextUnit = UnitService.findNextUnit([...units], nonExistUnit!);
    expect(nextUnit).toBeFalsy();

    nextUnit = UnitService.findNextUnit([...units], units[3]);
    expect(nextUnit).toBeFalsy();

    nextUnit = UnitService.findNextUnit([...units], units[0]);
    expect(nextUnit).toBeTruthy();
    expect(nextUnit!.id).toBe(units[1].id);
  });
});
