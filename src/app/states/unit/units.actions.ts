import {createActionGroup, props} from "@ngrx/store";
import {Unit} from "../../services/unit/dtos/unit";
import {CostFilter} from "../../services/unit/dtos/cost-filter";
import {ButtonGroupOption} from "../../common/button-group/models/button-group-option";

export const UnitsActions = createActionGroup({
    source: 'Units',
    events: {
        'Get List': props<{ response: readonly Unit[] }>(),
        'Age Filter': props<{ age: ButtonGroupOption<number> }>(),
        'Cost Filter': props<{ costFilters: CostFilter[] }>(),
        'Select Unit': props<{ unit: Unit }>()
    },
});