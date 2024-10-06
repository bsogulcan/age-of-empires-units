import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CostFilter} from "../../unit-list/models/cost-filter";

@Component({
    selector: 'app-range-input',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './range-input.component.html',
    styleUrl: './range-input.component.scss'
})
export class RangeInputComponent {
    @Input({
        required: true
    })
    costFilter!: CostFilter;

    @Output()
    costFilterChange = new EventEmitter<CostFilter>();

    @Input()
    min: number = 0;

    @Input()
    max: number = 100;
}
