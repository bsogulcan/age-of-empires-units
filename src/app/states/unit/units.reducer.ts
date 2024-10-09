import {Unit} from "../../services/unit/dtos/unit";
import {CostFilter} from "../../services/unit/dtos/cost-filter";
import {createReducer, on} from "@ngrx/store";
import {UnitsActions} from "./units.actions";
import {ButtonGroupOption} from "../../common/button-group/models/button-group-option";
import {UnitService} from "../../services/unit/unit.service";

export interface UnitState {
    units: ReadonlyArray<Unit>,
    filteredUnits: ReadonlyArray<Unit>
    ageFilter: ButtonGroupOption<number>,
    costFilters: Array<CostFilter>,
    selectedUnit: Unit | undefined,
    previousUnit: Unit | undefined,
    nextUnit: Unit | undefined
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
    selectedUnit: undefined,
    previousUnit: undefined,
    nextUnit: undefined
};

export const unitsReducer = createReducer(
    initialUnitState,
    on(UnitsActions.getList, (state, {response}) => {
        const filteredUnits = UnitService.filterUnits(response.map(item => Object.assign({}, item)), state.ageFilter.displayName, state.costFilters);
        return {...state, units: response, filteredUnits};
    }),
    on(UnitsActions.ageFilter, (state, {age}) => {
        const filteredUnits = UnitService.filterUnits(state.units.map(item => Object.assign({}, item)), age.displayName, state.costFilters);
        return {...state, ageFilter: age, filteredUnits};
    }),
    on(UnitsActions.costFilter, (state, {costFilters}) => {
        const filteredUnits = UnitService.filterUnits(state.units.map(item => Object.assign({}, item)), state.ageFilter.displayName, costFilters);
        return {...state, costFilters, filteredUnits};
    }),
    on(UnitsActions.selectUnit, (state, {unit}) => {
        return {
            ...state,
            selectedUnit: unit,
            previousUnit: UnitService.findPreviousUnit(state.filteredUnits, unit),
            nextUnit: UnitService.findNextUnit(state.filteredUnits, unit)
        };
    })
);