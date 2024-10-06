import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UnitState} from "./units.reducer";
import {UnitService} from "../../services/unit/unit.service";

const selectUnit = createFeatureSelector<UnitState>('units');

export const selectUnits = createSelector(
    selectUnit,
    (state: UnitState) => state.units
);

export const selectFilteredUnits = createSelector(
    selectUnit,
    (state: UnitState) => {
        let units = [...state.units];
        if (state.ageFilter && state.ageFilter.value != 0) {
            units = units.filter(x => x.age == state.ageFilter.displayName)
        }

        state.costFilters.forEach(costFilter => {
            if (costFilter.enabled) {
                if (costFilter.type == 'food') {
                    units = units.filter(x => x.cost && x.cost.Food && x.cost!.Food! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Food && x.cost!.Food! <= costFilter.max)
                }

                if (costFilter.type == 'wood') {
                    units = units.filter(x => x.cost && x.cost.Wood && x.cost!.Wood! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Wood && x.cost!.Wood! <= costFilter.max)
                }

                if (costFilter.type == 'gold') {
                    units = units.filter(x => x.cost && x.cost.Gold && x.cost!.Gold! >= costFilter.min)
                    units = units.filter(x => x.cost && x.cost.Gold && x.cost!.Gold! <= costFilter.max)
                }
            }
        });


        return units.map(x => UnitService.convertToUnitDto(x));
    }
);

export const selectAgeFilter = createSelector(
    selectUnit,
    (state: UnitState) => state.ageFilter
);

export const selectCostFilters = createSelector(
    selectUnit,
    (state: UnitState) => state.costFilters
);

export const selectSelectedUnit = createSelector(
    selectUnit,
    (state: UnitState) => state.selectedUnit
);