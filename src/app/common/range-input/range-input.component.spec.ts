import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RangeInputComponent} from './range-input.component';
import {CostFilter} from "../../services/unit/dtos/cost-filter";
import {By} from "@angular/platform-browser";

describe('RangeInputComponent', () => {
    let component: RangeInputComponent;
    let fixture: ComponentFixture<RangeInputComponent>;
    let costFilter: CostFilter;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RangeInputComponent]
        })
            .compileComponents();

        costFilter = {
            type: 'wood',
            displayName: "Wood",
            enabled: false,
            min: 0,
            max: 200
        };

        fixture = TestBed.createComponent(RangeInputComponent);
        fixture.componentRef.setInput('costFilter', costFilter);
        fixture.componentRef.setInput('max', 200);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should enable sliders by checkbox', async () => {
        const checkbox = fixture.debugElement.nativeElement.querySelector('#' + costFilter.type);
        expect(checkbox.checked).toBeFalse();

        const minRange = fixture.debugElement.nativeElement.querySelector('#' + costFilter.type + '-min');
        expect(minRange.getAttribute('disabled')).toBe('');
        expect(minRange.value).toBe(costFilter.min.toString());

        const maxRange = fixture.debugElement.nativeElement.querySelector('#' + costFilter.type + '-max');
        expect(maxRange.getAttribute('disabled')).toBe('');
        expect(maxRange.value).toBe(costFilter.max.toString());

        checkbox.click();
        expect(checkbox.checked).toBeTrue();

        await fixture.whenStable();

        expect(minRange.getAttribute('disabled')).toBeFalsy();
        expect(maxRange.getAttribute('disabled')).toBeFalsy();
    });

    it('should set validate value changes', async () => {
        const checkbox = fixture.debugElement.nativeElement.querySelector('#' + costFilter.type);
        checkbox.click();

        const minInput = fixture.debugElement.query(By.css('#' + costFilter.type + '-min'));
        const maxInput = fixture.debugElement.query(By.css('#' + costFilter.type + '-max'));
        minInput.nativeElement.value = '150';
        minInput.nativeElement.dispatchEvent(new Event('change'));

        maxInput.nativeElement.value = '140';
        maxInput.nativeElement.dispatchEvent(new Event('change'));

        fixture.detectChanges();
        await fixture.whenStable();

        expect(maxInput.nativeElement.value).toBe('150');
    });
});
