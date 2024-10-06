import {Component, EventEmitter, Input, Output} from '@angular/core';
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
export class ButtonGroupComponent {

    @Input()
    class?: string

    @Input({
        required: true
    })
    options!: Array<ButtonGroupOption<any>>;

    @Input()
    selectedOption?: ButtonGroupOption<any>

    @Output()
    onSelectedChanged = new EventEmitter<ButtonGroupOption<any>>;

    onButtonClicked(option: ButtonGroupOption<any>) {
        this.selectedOption = option;
        this.onSelectedChanged.emit(this.selectedOption);
    }
}
