import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Unit} from "../services/unit/dtos/unit";
import {selectSelectedUnit} from "../states/unit/units.selector";
import {ActivatedRoute, Router} from "@angular/router";
import {WrapperComponent} from "../common/wrapper/wrapper.component";

@Component({
    selector: 'app-unit-detail',
    standalone: true,
    imports: [
        WrapperComponent
    ],
    templateUrl: './unit-detail.component.html',
    styleUrl: './unit-detail.component.scss'
})
export class UnitDetailComponent implements OnInit, OnDestroy {
    store = inject(Store);
    router = inject(Router);

    selectedUnit$ = new Subscription();
    selectedUnit: Unit | undefined;

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
