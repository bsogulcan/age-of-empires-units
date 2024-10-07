import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonGroupOption} from "./models/button-group-option";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-button-group',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent implements OnInit {

    @Input()
    class?: string

    @Input({
        required: true
    })
    options!: Array<ButtonGroupOption<any>>;

    @Input()
    selectedOptionIndex?: number;

    @Output()
    onSelectedChanged = new EventEmitter<ButtonGroupOption<any>>;

    ngOnInit() {
    }

    onButtonClicked(option: ButtonGroupOption<any>) {
        this.selectedOptionIndex = this.options.indexOf(option);
        this.onSelectedChanged.emit(option);
    }
}
