import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitDetailComponent} from './unit-detail.component';
import {StoreModule} from "@ngrx/store";
import {unitsReducer} from "../states/unit/units.reducer";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";

describe('UnitDetailComponent', () => {
    let component: UnitDetailComponent;
    let fixture: ComponentFixture<UnitDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnitDetailComponent, StoreModule.forRoot(unitsReducer), RouterTestingModule, HttpClientModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UnitDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
