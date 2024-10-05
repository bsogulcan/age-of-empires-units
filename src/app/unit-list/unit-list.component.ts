import {Component, inject, OnInit} from '@angular/core';
import {WrapperComponent} from "../common/wrapper/wrapper.component";
import {TableComponent} from "../common/table/table.component";
import {TableColumn} from "../common/table/models/table-column";
import {UnitService} from "../services/unit/unit.service";
import {Unit} from "../services/unit/dtos/unit";
import {Router} from "@angular/router";

@Component({
    selector: 'app-unit-list',
    standalone: true,
    imports: [
        WrapperComponent,
        TableComponent,
    ],
    templateUrl: './unit-list.component.html',
    styleUrl: './unit-list.component.scss'
})
export class UnitListComponent implements OnInit {

    unitService = inject(UnitService);
    router = inject(Router);
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
    ]
    units?: Array<Unit>;

    ngOnInit(): void {
        this.unitService.getList()
            .subscribe(response => {
                this.units = response.units;
            });
    }

    navigateUnitDescription(unit: Unit) {
        this.router.navigate(['/unit/', unit.id]);
    }
}
