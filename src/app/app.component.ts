import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
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
