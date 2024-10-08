import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableComponent} from './table.component';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        fixture.componentRef.setInput('columns', []);
        fixture.componentRef.setInput('entities', []);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
