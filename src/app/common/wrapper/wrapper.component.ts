import {Component} from '@angular/core';

@Component({
    selector: 'app-wrapper',
    standalone: true,
    imports: [],
    template: `
        <div class="wrapper mx-auto max-w-4xl sm:p-6">
            <ng-content></ng-content>
        </div>
    `,
    styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {

}
