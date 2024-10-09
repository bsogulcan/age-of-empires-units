import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TableComponent} from './table.component';
import {TableColumn} from "./models/table-column";
import {By} from "@angular/platform-browser";

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let columns: TableColumn[];
    let entities: unknown[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TableComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        columns = [
            {
                name: 'foo',
                displayName: 'Foo'
            },
            {
                name: 'bar',
                displayName: 'Bar'
            }
        ];

        entities = [];
        for (let i = 0; i < 100; i++) {
            entities.push({
                foo: i,
                bar: i.toString()
            });
        }

        fixture.componentRef.setInput('columns', columns);
        fixture.componentRef.setInput('entities', entities);
        fixture.componentRef.setInput('pagination', true);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize pages', () => {
        component.displayCount = 10;
        component.initialPages();
        expect(component.pages?.length).toBe(10);

        component.displayCount = 25;
        component.initialPages();
        expect(component.pages?.length).toBe(4);

        component.displayCount = 50;
        component.initialPages();
        expect(component.pages?.length).toBe(2);
    });

    it('should list by page', () => {
        component.displayCount = 10;
        component.initialPages();
        component.filterPage(0);
        fixture.detectChanges();
        expect(component.rows).toEqual(entities.splice(0, 10));

        component.filterPage(1);
        fixture.detectChanges();
        expect(component.rows).toEqual(entities.splice(10, 10));
    });

    it('should emit on row selected', () => {
        component.rowSelected.subscribe(selectedRow => {
            expect(selectedRow).toBe(entities[2]);
        });

        const thirdRow = fixture.debugElement.query(By.css('tr.border:nth-child(3)'));
        thirdRow.nativeElement.click();
    });

});
