import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {Unit} from "../services/unit/dtos/unit";
import {selectFilteredUnits, selectSelectedUnit} from "../states/unit/units.selector";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WrapperComponent} from "../common/wrapper/wrapper.component";
import {ButtonGroupComponent} from "../common/button-group/button-group.component";
import {RangeInputComponent} from "../common/range-input/range-input.component";
import {TableComponent} from "../common/table/table.component";
import {UnitService} from "../services/unit/unit.service";
import {UnitsActions} from "../states/unit/units.actions";

@Component({
    selector: 'app-unit-detail',
    standalone: true,
    imports: [
        WrapperComponent,
        ButtonGroupComponent,
        RangeInputComponent,
        TableComponent,
        RouterLink
    ],
    templateUrl: './unit-detail.component.html',
    styleUrl: './unit-detail.component.scss'
})
export class UnitDetailComponent implements OnInit, OnDestroy {
    store = inject(Store);
    router = inject(Router);
    activatedRoute = inject(ActivatedRoute);
    unitService = inject(UnitService);

    service$ = new Subscription();
    selectedUnit$ = new Subscription();
    selectedUnit: Unit | undefined;

    filteredUnits$ = new Subscription();
    filteredUnits: Array<Unit> = [];

    previousUnitId: number | undefined;
    nextUnitId: number | undefined;

    ngOnInit(): void {
        this.selectedUnit$ = this.store.select(selectSelectedUnit)
            .subscribe(unit => {
                this.selectedUnit = unit;
                return;
            });

        this.filteredUnits$ = this.store.select(selectFilteredUnits).subscribe(filteredUnits => {
            this.filteredUnits = filteredUnits.map((item) => Object.assign({}, item));
            this.preparePreviousAndNextUnits();
        })


        this.activatedRoute.params.subscribe(params => {
            const unitId = params['id'];
            if (unitId) {
                this.service$ = this.unitService.getList().subscribe({
                    next: response => {
                        this.store.dispatch(UnitsActions.getList({response: response.units}));
                        this.store.dispatch(
                            UnitsActions.filterUnits({units: response.units})
                        );

                        const selectedUnit = response.units.find(x => x.id == parseInt(unitId));

                        if (selectedUnit) {
                            this.store.dispatch(UnitsActions.selectUnit({unit: selectedUnit}))
                        }
                    }
                })

                return;
            }
        })
    }

    ngOnDestroy(): void {
        this.selectedUnit$.unsubscribe();
        this.service$?.unsubscribe();
        this.filteredUnits$.unsubscribe();
    }

    navigateListPage() {
        this.router.navigate(['/unit-list']);
    }

    preparePreviousAndNextUnits() {
        const index = this.filteredUnits.findIndex(x => x.id == this.selectedUnit!.id);
        this.previousUnitId = this.filteredUnits[index - 1]?.id || undefined;
        this.nextUnitId = this.filteredUnits[index + 1]?.id || undefined;
    }

    navigatePreviousUnit() {
        const unit = this.filteredUnits.find(x => x.id == this.previousUnitId);
        if (!unit) {
            return;
        }

        this.store.dispatch(UnitsActions.selectUnit({unit: unit}));
        this.router.navigate(['/unit/' + unit.id]);
    }

    navigateNextUnit() {
        const unit = this.filteredUnits.find(x => x.id == this.nextUnitId);
        if (!unit) {
            return;
        }

        this.store.dispatch(UnitsActions.selectUnit({unit: unit}));
        this.router.navigate(['/unit/' + unit.id]);
    }
}
