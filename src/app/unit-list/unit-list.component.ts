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
import {Title} from "@angular/platform-browser";

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
    titleService = inject(Title);

    service$ = new Subscription();
    filteredUnits$ = new Subscription();
    ageFilter$ = new Subscription();
    costFilters$ = new Subscription();

    columns: TableColumn[] = [
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

    units: Unit[] = [];
    filteredUnits: UnitDto[] = [];
    selectedAgeIndex = 0;
    costFilters: CostFilter[] = []

    ngOnInit(): void {
        this.titleService.setTitle('Units | Age of Empires');
        this.service$ = this.unitService.getList()
            .subscribe(response => {
                    this.units = response.units;
                    this.store.dispatch(UnitsActions.getList({response: response.units}));
                    this.changeDetector.markForCheck();
                }
            );

        this.filteredUnits$ = this.store.select(selectFilteredUnits).pipe().subscribe(filteredUnits => {
            this.filteredUnits = filteredUnits.map(x => UnitService.convertToUnitDto(x));
            this.changeDetector.markForCheck()
        });

        this.ageFilter$ = this.store.select(selectAgeFilter).subscribe(age => {
            this.selectedAgeIndex = this.ages.findIndex(x => x.value == age.value);
            this.changeDetector.markForCheck()
        });

        this.costFilters$ = this.store.select(selectCostFilters).subscribe(filters => {
            this.costFilters = filters.map(item => Object.assign({}, item));
            this.changeDetector.markForCheck()
        });

    }

    ngOnDestroy(): void {
        this.service$.unsubscribe();
        this.filteredUnits$.unsubscribe();
        this.ageFilter$.unsubscribe();
        this.costFilters$.unsubscribe();
    }

    navigateUnitDescription(unitDto: UnitDto) {
        const unit = this.units.find(x => x.id == unitDto.id);
        if (!unit) {
            return;
        }

        this.store.dispatch(UnitsActions.selectUnit({unit: unit}));
        this.router.navigate(['/unit/', unit.id]);
    }

    onAgeChanged(event: ButtonGroupOption<number>) {
        this.store.dispatch(UnitsActions.ageFilter({age: event}));
    }

    onFilterChanged() {
        this.store.dispatch(UnitsActions.costFilter({costFilters: this.costFilters}));
    }
}
