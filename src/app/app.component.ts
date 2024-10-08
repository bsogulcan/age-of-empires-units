import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./common/header/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, NgIf, NgClass, HeaderComponent, NgOptimizedImage],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
}
