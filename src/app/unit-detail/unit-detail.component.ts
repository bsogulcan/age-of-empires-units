import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Unit } from '../services/unit/dtos/unit';
import {
  selectFilteredUnits,
  selectNextUnit,
  selectPreviousUnit,
  selectSelectedUnit,
} from '../states/unit/units.selector';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WrapperComponent } from '../common/wrapper/wrapper.component';
import { ButtonGroupComponent } from '../common/button-group/button-group.component';
import { RangeInputComponent } from '../common/range-input/range-input.component';
import { TableComponent } from '../common/table/table.component';
import { UnitService } from '../services/unit/unit.service';
import { UnitsActions } from '../states/unit/units.actions';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-unit-detail',
  standalone: true,
  imports: [
    WrapperComponent,
    ButtonGroupComponent,
    RangeInputComponent,
    TableComponent,
    RouterLink,
  ],
  templateUrl: './unit-detail.component.html',
  styleUrl: './unit-detail.component.scss',
})
export class UnitDetailComponent implements OnInit, OnDestroy {
  store = inject(Store);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  unitService = inject(UnitService);
  titleService = inject(Title);

  service$ = new Subscription();
  selectedUnit$ = new Subscription();
  selectPreviousUnit$ = new Subscription();
  selectNextUnit$ = new Subscription();

  selectedUnit: Unit | undefined;
  previousUnit: Unit | undefined;
  nextUnit: Unit | undefined;

  filteredUnits$ = new Subscription();
  filteredUnits: Unit[] = [];

  ngOnInit(): void {
    this.selectedUnit$ = this.store
      .select(selectSelectedUnit)
      .subscribe((unit) => {
        this.selectedUnit = unit;
        this.titleService.setTitle(
          this.selectedUnit?.name + ' | Age of Empires',
        );
        return;
      });

    this.filteredUnits$ = this.store
      .select(selectFilteredUnits)
      .subscribe((filteredUnits) => {
        this.filteredUnits = filteredUnits.map((item) =>
          Object.assign({}, item),
        );
      });

    this.selectPreviousUnit$ = this.store
      .select(selectPreviousUnit)
      .subscribe((unit) => {
        this.previousUnit = unit;
      });

    this.selectNextUnit$ = this.store
      .select(selectNextUnit)
      .subscribe((unit) => {
        this.nextUnit = unit;
      });

    this.activatedRoute.params.subscribe((params) => {
      const unitId = params['id'];
      if (unitId) {
        this.service$ = this.unitService.getList().subscribe({
          next: (response) => {
            this.store.dispatch(
              UnitsActions.getList({ response: response.units }),
            );
            const selectedUnit = response.units.find(
              (x) => x.id == parseInt(unitId),
            );
            if (selectedUnit) {
              this.store.dispatch(
                UnitsActions.selectUnit({ unit: selectedUnit }),
              );
            }
          },
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedUnit$.unsubscribe();
    this.selectPreviousUnit$.unsubscribe();
    this.selectNextUnit$.unsubscribe();
    this.service$?.unsubscribe();
    this.filteredUnits$.unsubscribe();
  }
}
