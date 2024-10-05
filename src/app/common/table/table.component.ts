import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableColumn} from "./models/table-column";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

    @Input({
        required: true
    })
    columns!: Array<TableColumn>;

    @Input({
        required: true
    })
    entities!: Array<any>;

    @Input()
    pagination: boolean = false;

    @Output()
    public onRowSelected = new EventEmitter<any>();

    skip: number = 0;
    take: number = 0;
    displayCount: 5 | 10 | 25 | 50 = 25;
    pages: Array<number> = [];


    ngOnInit(): void {
        const pageCount = Math.floor(this.entities.length / this.displayCount);
        console.log('Page Count:', pageCount)
    }
}
