import {Component, inject, OnInit} from '@angular/core';
import {WrapperComponent} from "../common/wrapper/wrapper.component";
import {TableComponent} from "../common/table/table.component";
import {TableColumn} from "../common/table/models/table-column";
import {UnitService} from "../services/unit/unit.service";
import {Unit} from "../services/unit/dtos/unit";
import {Router} from "@angular/router";
import {ButtonGroupOption} from "../common/button-group/models/button-group-option";
import {ButtonGroupComponent} from "../common/button-group/button-group.component";

@Component({
    selector: 'app-unit-list',
    standalone: true,
    imports: [
        WrapperComponent,
        TableComponent,
        ButtonGroupComponent,
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
            name: 'description',
            displayName: 'Description',
        }
    ];
    allUnits?: Array<Unit>;
    filteredUnits?: Array<Unit>;

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
        this.filteredUnits = [...this.allUnits!];
        if (this.selectedAge && this.selectedAge!.value != 0) {
            this.filteredUnits = this.filteredUnits.filter(x => x.age == this.selectedAge?.displayName!)
        }
    }
}
