import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonGroupComponent} from './button-group.component';
import {ButtonGroupOption} from "./models/button-group-option";

describe('ButtonGroupComponent', () => {
    let component: ButtonGroupComponent;
    let fixture: ComponentFixture<ButtonGroupComponent>;
    let options: Array<ButtonGroupOption<number>>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonGroupComponent]
        })
            .compileComponents();

        options = [
            {
                value: 0,
                displayName: 'First button'
            },
            {
                value: 1,
                displayName: 'Second button'
            },
            {
                value: 2,
                displayName: 'Third button'
            },
        ]
        fixture = TestBed.createComponent(ButtonGroupComponent);
        fixture.componentRef.setInput('options', options);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create buttons', () => {
        expect(component.options.length).toBe(options.length);
    });

});
