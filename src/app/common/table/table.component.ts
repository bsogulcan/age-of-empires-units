import {Component, EventEmitter, Input, Output} from '@angular/core';
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
export class TableComponent {
    @Input({
        required: true
    })
    columns!: TableColumn[];

    private _entities!: any[];
   
    @Input({
        required: true
    })
    set entities(value: any[]) {
        this._entities = value;
        this.initialPages();
    }

    get entities() {
        return this._entities;
    }

    @Input()
    pagination = false;

    @Output()
    public rowSelected = new EventEmitter<any>();

    rows: any[] = [];

    skip = 0;
    displayCount: 10 | 25 | 50 = 10;
    selectedPageIndex = 0;
    pages: number[] = [];

    onDisplayCountChanged() {
        this.initialPages();
    }

    initialPages() {
        this.pages = [];
        const pageCount = Math.ceil(this._entities.length / this.displayCount);
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
        this.rows = [...this._entities].splice(this.skip, this.displayCount);
    }

}
