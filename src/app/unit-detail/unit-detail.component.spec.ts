import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitDetailComponent} from './unit-detail.component';
import {Store} from "@ngrx/store";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {provideMockStore} from "@ngrx/store/testing";

describe('UnitDetailComponent', () => {
    let component: UnitDetailComponent;
    let fixture: ComponentFixture<UnitDetailComponent>;
    let store: jasmine.SpyObj<Store>;


    beforeEach(async () => {
        store = jasmine.createSpyObj('Store', ['dispatch', 'select']);

        await TestBed.configureTestingModule({
            imports: [
                UnitDetailComponent,
                RouterTestingModule,
                HttpClientModule
            ],
            providers: [
                {provide: Store, useValue: store},
                provideMockStore()
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UnitDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe', () => {
        spyOn(component.selectedUnit$, 'unsubscribe');
        spyOn(component.selectPreviousUnit$, 'unsubscribe');
        spyOn(component.selectNextUnit$, 'unsubscribe');
        spyOn(component.service$, 'unsubscribe');
        spyOn(component.filteredUnits$, 'unsubscribe');

        component.ngOnDestroy();

        expect(component.selectedUnit$.unsubscribe).toHaveBeenCalled();
        expect(component.selectPreviousUnit$.unsubscribe).toHaveBeenCalled();
        expect(component.selectNextUnit$.unsubscribe).toHaveBeenCalled();
        expect(component.service$.unsubscribe).toHaveBeenCalled();
        expect(component.filteredUnits$.unsubscribe).toHaveBeenCalled();
    });


});
