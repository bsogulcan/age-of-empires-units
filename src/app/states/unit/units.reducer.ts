import {Unit} from "../../services/unit/dtos/unit";
import {CostFilter} from "../../services/unit/dtos/cost-filter";
import {createReducer, on} from "@ngrx/store";
import {UnitsActions} from "./units.actions";
import {ButtonGroupOption} from "../../common/button-group/models/button-group-option";

export interface UnitState {
    units: ReadonlyArray<Unit>,
    filteredUnits: ReadonlyArray<Unit>
    ageFilter: ButtonGroupOption<number>,
    costFilters: Array<CostFilter>,
    selectedUnit: Unit | undefined,
}

export const initialUnitState: UnitState = {
    units: [],
    filteredUnits: [],
    ageFilter: {
        value: 0,
        displayName: 'All'
    },
    costFilters: [
        {
            type: 'food',
            displayName: 'Food',
            enabled: false,
            min: 0,
            max: 200
        },
        {
            type: 'wood',
            displayName: 'Wood',
            enabled: false,
            min: 0,
            max: 200
        },
        {
            type: 'gold',
            displayName: 'Gold',
            enabled: false,
            min: 0,
            max: 200
        }
    ],
    selectedUnit: undefined
};

export const unitsReducer = createReducer(
    initialUnitState,
    on(UnitsActions.getList, (state, {response}) => ({
        ...state,
        units: response,
        filteredUnits: response
    })),
    on(UnitsActions.filterUnits, (state, {units}) => ({
        ...state,
        filteredUnits: units
    })),
    on(UnitsActions.ageFilter, (state, {age}) => ({
        ...state,
        ageFilter: age
    })),
    on(UnitsActions.costFilter, (state, {costFilters}) => ({
        ...state,
        costFilters
    })),
    on(UnitsActions.selectUnit, (state, {unit}) => ({
        ...state,
        selectedUnit: unit
    })),
);