import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./layouts/header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NgIf, NgClass, HeaderComponent, NgOptimizedImage],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {


    ngOnInit(): void {
        this.initialDarkTheme();
    }

    
    initialDarkTheme() {
        const theme = localStorage.getItem('theme');

        if (!theme || theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
}
