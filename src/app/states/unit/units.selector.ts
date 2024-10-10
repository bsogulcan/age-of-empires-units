import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitState } from './units.reducer';

const selectUnit = createFeatureSelector<UnitState>('units');

export const selectUnits = createSelector(
  selectUnit,
  (state: UnitState) => state.units,
);

export const selectFilteredUnits = createSelector(
  selectUnit,
  (state: UnitState) => state.filteredUnits,
);

export const selectAgeFilter = createSelector(
  selectUnit,
  (state: UnitState) => state.ageFilter,
);

export const selectCostFilters = createSelector(
  selectUnit,
  (state: UnitState) => state.costFilters,
);

export const selectSelectedUnit = createSelector(
  selectUnit,
  (state: UnitState) => state.selectedUnit,
);

export const selectPreviousUnit = createSelector(
  selectUnit,
  (state: UnitState) => state.previousUnit,
);

export const selectNextUnit = createSelector(
  selectUnit,
  (state: UnitState) => state.nextUnit,
);

export const selectPageIndex = createSelector(
  selectUnit,
  (state: UnitState) => state.pageIndex,
);
