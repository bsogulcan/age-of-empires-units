import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent, RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have the 'Age of Empires' title`, () => {
        const fixture = TestBed.createComponent(HeaderComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Age of Empires');
    });

    it('should toggle menu', () => {
        expect(component.isMenuOpen).toBeFalse();
        component.toggleMenu();
        expect(component.isMenuOpen).toBeTrue();
    });

    it('should render navigate links', () => {
        const homeLink = fixture.debugElement.nativeElement.querySelector('#home-link');
        expect(homeLink).toBeTruthy();
        expect(homeLink.getAttribute('href')).toBe('/')

        const unitsLink = fixture.debugElement.nativeElement.querySelector('#units-link');
        expect(unitsLink).toBeTruthy();
        expect(unitsLink.getAttribute('href')).toBe('/unit-list')
    });

});
