import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Unit} from "../services/unit/dtos/unit";
import {selectSelectedUnit} from "../states/unit/units.selector";

@Component({
    selector: 'app-unit-detail',
    standalone: true,
    imports: [],
    templateUrl: './unit-detail.component.html',
    styleUrl: './unit-detail.component.scss'
})
export class UnitDetailComponent implements OnInit, OnDestroy {
    store = inject(Store);

    selectedUnit$ = new Subscription();
    selectedUnit?: Unit;

    ngOnInit(): void {
        this.selectedUnit$ = this.store.select(selectSelectedUnit)
            .subscribe(unit => {
                this.selectedUnit = unit;
            });
    }

    ngOnDestroy(): void {
        this.selectedUnit$.unsubscribe();
    }

}
