import { Allergen } from "./potlukk-reducer"

export type DishFormState = {
        name: string,
        description: string,
        broughtBy: number,
        serves: number,
        allergens: string[]
}

export type UpdateName = {type: "UPDATE_NAME", payload:string}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateBroughtBy = {type: "UPDATE_BROUGHTBY", payload: number}
export type UpdateServes = {type: "UPDATE_SERVES", payload: number}
export type AddAllergen = {type: "ADD_ALLERGEN", payload: string}
export type DeleteAllergen = {type: "DELETE_ALLERGEN", payload: string}
export type DishFormActions = UpdateName | UpdateDescription | UpdateBroughtBy | UpdateServes | AddAllergen
| DeleteAllergen
export function DishFormReducer(state: DishFormState, action: DishFormActions):DishFormState{

    const nextState: DishFormState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "UPDATE_NAME":{
            nextState.name = action.payload;
            return nextState
        }
        case "UPDATE_DESCRIPTION":{
            nextState.description = action.payload;
            return nextState
        }
        case "UPDATE_BROUGHTBY":{
            nextState.broughtBy = action.payload;
            return nextState
        }
        case "UPDATE_SERVES":{
            nextState.serves = action.payload;
            return nextState
        }
        case "ADD_ALLERGEN":{
            

            (!(nextState.allergens.some((item) => item === action.payload))) &&
            nextState.allergens.push(action.payload);
            return nextState
        }
        case "DELETE_ALLERGEN":{
            
            let newAllergens: string[] = nextState.allergens.filter((item)=>item !== action.payload);
            nextState.allergens = newAllergens;
            return nextState
        }
        
        default:{
            return nextState
        }
        
    }
}