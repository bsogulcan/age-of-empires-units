import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        NgClass
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'Age of Empires';
    isMenuOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
