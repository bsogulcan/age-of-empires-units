import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitResponse} from "./dtos/unit-response";
import {Unit, UnitDto} from "./dtos/unit";
import {Cost} from "./dtos/cost";

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    private url = 'database.json';
    httpClient = inject(HttpClient);

    getList(): Observable<UnitResponse> {
        return this.httpClient.get<UnitResponse>(this.url);
    }


    static convertToUnitDto(unit: Unit): UnitDto {
        return {
            id: unit.id,
            name: unit.name,
            age: unit.age,
            costs: this.stringifyCosts(unit.cost)
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
}
