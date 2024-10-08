import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitListComponent} from './unit-list.component';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideStore, Store, StoreModule} from "@ngrx/store";
import {initialUnitState, unitsReducer} from "../states/unit/units.reducer";
import {provideMockStore} from "@ngrx/store/testing";

describe('UnitListComponent', () => {
    let component: UnitListComponent;
    let fixture: ComponentFixture<UnitListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnitListComponent, RouterTestingModule, HttpClientModule, StoreModule.forRoot(unitsReducer),],
        })
            .compileComponents();

        fixture = TestBed.createComponent(UnitListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
