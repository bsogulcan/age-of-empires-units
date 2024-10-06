import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {WrapperComponent} from "../common/wrapper/wrapper.component";
import {TableComponent} from "../common/table/table.component";
import {TableColumn} from "../common/table/models/table-column";
import {UnitService} from "../services/unit/unit.service";
import {Unit} from "../services/unit/dtos/unit";
import {Router} from "@angular/router";
import {ButtonGroupOption} from "../common/button-group/models/button-group-option";
import {ButtonGroupComponent} from "../common/button-group/button-group.component";
import {RangeInputComponent} from "../common/range-input/range-input.component";
import {CostFilter} from "../services/unit/dtos/cost-filter";
import {UnitDto} from "../services/unit/dtos/unit-dto";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {UnitsActions} from "../states/unit/units.actions";
import {selectAgeFilter, selectCostFilters, selectFilteredUnits,} from "../states/unit/units.selector";

@Component({
    selector: 'app-unit-list',
    standalone: true,
    imports: [
        WrapperComponent,
        TableComponent,
        ButtonGroupComponent,
        RangeInputComponent
    ],
    templateUrl: './unit-list.component.html',
    styleUrl: './unit-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitListComponent implements OnInit, OnDestroy {

    unitService = inject(UnitService);
    store = inject(Store);
    router = inject(Router);
    changeDetector = inject(ChangeDetectorRef);

    service$ = new Subscription();
    filteredUnits$ = new Subscription();
    ageFilter$ = new Subscription();
    costFilters$ = new Subscription();

    columns: Array<TableColumn> = [
        {
            name: 'id',
            displayName: 'Id',
        },
        {
            name: 'name',
            displayName: 'Name',
        },
        {
            name: 'age',
            displayName: 'Age',
        },
        {
            name: 'costs',
            displayName: 'Costs',
        }
    ];
    ages: ButtonGroupOption<number>[] = [
        {
            value: 0,
            displayName: 'All'
        },
        {
            value: 1,
            displayName: 'Dark'
        },
        {
            value: 2,
            displayName: 'Feudal'
        },
        {
            value: 3,
            displayName: 'Castle'
        },
        {
            value: 4,
            displayName: 'Imperial'
        },
    ];

    filteredUnits: Array<UnitDto> = [];
    selectedAge: ButtonGroupOption<number> = {
        value: 0,
        displayName: 'All'
    };
    costFilters: Array<CostFilter> = []

    ngOnInit(): void {
        this.unitService.getList()
            .subscribe(response => {
                    this.store.dispatch(UnitsActions.getList({response: response.units}));
                    this.store.dispatch(
                        UnitsActions.filterUnits({units: response.units})
                    );
                    this.changeDetector.markForCheck();
                }
            );

        this.filteredUnits$ = this.store.select(selectFilteredUnits).subscribe(filteredUnits => {
            this.filteredUnits = filteredUnits;
            this.changeDetector.markForCheck()
        });

        this.ageFilter$ = this.store.select(selectAgeFilter).subscribe(age => {
            this.selectedAge = age;
            this.changeDetector.markForCheck()
        });

        this.costFilters$ = this.store.select(selectCostFilters).subscribe(filters => {
            this.costFilters = filters.map((item) => Object.assign({}, item));
            this.changeDetector.markForCheck()
        });

    }

    ngOnDestroy(): void {
        this.service$.unsubscribe();
        this.filteredUnits$.unsubscribe();
        this.ageFilter$.unsubscribe();
        this.costFilters$.unsubscribe();
    }

    navigateUnitDescription(unit: Unit) {
        this.store.dispatch(UnitsActions.selectUnit({unit: unit}));
        this.router.navigate(['/unit-details']);
    }

    onAgeChanged(event: ButtonGroupOption<any>) {
        this.store.dispatch(UnitsActions.ageFilter({age: event}))
    }

    onFilterChanged() {
        this.store.dispatch(UnitsActions.costFilter({costFilters: this.costFilters}));
    }
}
