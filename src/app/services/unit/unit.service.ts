import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitResponse } from './dtos/unit-response';
import { Unit } from './dtos/unit';
import { Cost } from './dtos/cost';
import { UnitDto } from './dtos/unit-dto';
import { CostFilter } from './dtos/cost-filter';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  httpClient = inject(HttpClient);
  private url = 'database.json';

  static convertToUnitDto(unit: Unit): UnitDto {
    return {
      id: unit.id,
      name: unit.name,
      age: unit.age,
      costs: this.stringifyCosts(unit.cost),
    };
  }

  static stringifyCosts(cost?: Cost): string {
    if (!cost) {
      return '~';
    }

    const parts: string[] = [];

    if (cost.Food) {
      parts.push(`Food: ${cost.Food}`);
    }

    if (cost.Wood) {
      parts.push(`Wood: ${cost.Wood}`);
    }

    if (cost.Gold) {
      parts.push(`Gold: ${cost.Gold}`);
    }

    return parts.length ? parts.join(', ') : '~';
  }

  static filterUnits(units: Unit[], age: string, costs: CostFilter[]): Unit[] {
    if (age != 'All') {
      units = units.filter((x) => x.age == age);
    }

    costs.forEach((cost) => {
      if (cost.enabled) {
        if (cost.type == 'food') {
          units = units.filter(
            (x) => x.cost && x.cost.Food && x.cost!.Food! >= cost.min,
          );
          units = units.filter(
            (x) => x.cost && x.cost.Food && x.cost!.Food! <= cost.max,
          );
        }

        if (cost.type == 'wood') {
          units = units.filter(
            (x) => x.cost && x.cost.Wood && x.cost!.Wood! >= cost.min,
          );
          units = units.filter(
            (x) => x.cost && x.cost.Wood && x.cost!.Wood! <= cost.max,
          );
        }

        if (cost.type == 'gold') {
          units = units.filter(
            (x) => x.cost && x.cost.Gold && x.cost!.Gold! >= cost.min,
          );
          units = units.filter(
            (x) => x.cost && x.cost.Gold && x.cost!.Gold! <= cost.max,
          );
        }
      }
    });

    return units;
  }

  static findPreviousUnit(units: readonly Unit[], unit: Unit) {
    const index = units.findIndex((x) => x.id == unit.id);
    if (index === -1) {
      return;
    }

    if (!units[index - 1]) {
      return;
    }

    return units[index - 1];
  }

  static findNextUnit(units: readonly Unit[], unit: Unit) {
    const index = units.findIndex((x) => x.id == unit.id);
    if (index === -1) {
      return;
    }

    if (!units[index + 1]) {
      return;
    }

    return units[index + 1];
  }

  getList(): Observable<UnitResponse> {
    return this.httpClient.get<UnitResponse>(this.url);
  }
}
