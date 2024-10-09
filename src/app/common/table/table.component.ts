import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TableColumn} from "./models/table-column";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ButtonGroupComponent} from "../button-group/button-group.component";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        NgClass,
        ButtonGroupComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
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

    rows: Array<any> = [];

    skip: number = 0;
    displayCount: 10 | 25 | 50 = 10;
    selectedPageIndex: number = 0;
    pages: Array<number> = [];

    ngOnInit(): void {
        this.initialPages();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initialPages();
        console.log(this.entities)
    }

    onDisplayCountChanged() {
        this.initialPages();
    }

    initialPages() {
        this.pages = [];
        const pageCount = Math.ceil(this.entities.length / this.displayCount);
        for (let i = 0; i < pageCount; i++) {
            this.pages.push(i);
        }

        this.filterPage(0);
    }

    filterPage(pageIndex: number) {
        if (pageIndex < 0) {
            return;
        }

        if (this.pages.length > 0 && pageIndex > this.pages.length - 1) {
            return;
        }

        this.selectedPageIndex = pageIndex;
        this.skip = pageIndex * this.displayCount;
        this.rows = [...this.entities].splice(this.skip, this.displayCount);
    }

}
