import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UnitResponse} from "./dtos/unit-response";

@Injectable({
    providedIn: 'root'
})
export class UnitService {
    private url = 'database.json';
    httpClient = inject(HttpClient);

    getList(): Observable<UnitResponse> {
        return this.httpClient.get<UnitResponse>(this.url);
    }
}
