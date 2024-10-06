import {Component, inject, OnInit} from '@angular/core';
import {WrapperComponent} from "../common/wrapper/wrapper.component";
import {TableComponent} from "../common/table/table.component";
import {TableColumn} from "../common/table/models/table-column";
import {UnitService} from "../services/unit/unit.service";
import {Unit, UnitDto} from "../services/unit/dtos/unit";
import {Router} from "@angular/router";
import {ButtonGroupOption} from "../common/button-group/models/button-group-option";
import {ButtonGroupComponent} from "../common/button-group/button-group.component";
import {RangeInputComponent} from "../common/range-input/range-input.component";
import {CostFilter} from "./models/cost-filter";

@Component({
    selector: 'app-unit-list',
    standalone: true,
    imports: [
        WrapperComponent,
        TableComponent,
        ButtonGroupComponent,
        RangeInputComponent,
    ],
    templateUrl: './unit-list.component.html',
    styleUrl: './unit-list.component.scss'
})
export class UnitListComponent implements OnInit {

    unitService = inject(UnitService);
    router = inject(Router);

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
    selectedAge?: ButtonGroupOption<number>;

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
    costFilters: Array<CostFilter> = [
        {
            type: 'food',
            displayName: 'Food',
            enabled: false,
            min: 0,
            max: 200
        },
        {
            type: 'wood',
            displayName: 'Wood',
            enabled: false,
            min: 0,
            max: 200
        },
        {
            type: 'gold',
            displayName: 'Gold',
            enabled: false,
            min: 0,
            max: 200
        }
    ]


    allUnits?: Array<Unit>;
    filteredUnits?: Array<UnitDto>;

    ngOnInit(): void {
        this.unitService.getList()
            .subscribe(response => {
                this.allUnits = response.units;
                this.filterUnits();
            });
    }

    navigateUnitDescription(unit: Unit) {
        this.router.navigate(['/unit/', unit.id]);
    }

    onAgeChanged(event: ButtonGroupOption<any>) {
        this.selectedAge = event;
        this.filterUnits();
    }

    filterUnits() {
        let units = [...this.allUnits!];
        if (this.selectedAge && this.selectedAge!.value != 0) {
            units = units.filter(x => x.age == this.selectedAge?.displayName!)
        }

        this.costFilters.forEach(costFilter => {
            if (costFilter.enabled) {
                if (costFilter.type == 'food') {
                    units = units.filter(x => x.cost && x.cost.Food && x.cost!.Food! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Food && x.cost!.Food! <= costFilter.max)
                }

                if (costFilter.type == 'wood') {
                    units = units.filter(x => x.cost && x.cost.Wood && x.cost!.Wood! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Wood && x.cost!.Wood! <= costFilter.max)
                }

                if (costFilter.type == 'gold') {
                    units = units.filter(x => x.cost && x.cost.Gold && x.cost!.Gold! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Gold && x.cost!.Gold! <= costFilter.max)
                }
            }
        });

        this.filteredUnits = units.map(x => UnitService.convertToUnitDto(x));
    }

}
