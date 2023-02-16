import { Allergen } from "./potlukk-reducer"

export type DishFormState = {
    potlukkId: number,
    dishes: {
        name: string,
        description: string,
        broughtBy: number,
        serves: number,
        allergens: string[]
    }
}

export type UpdateName = {type: "UPDATE_NAME", payload:string}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateBroughtBy = {type: "UPDATE_BROUGHTBY", payload: number}
export type UpdateServes = {type: "UPDATE_SERVES", payload: number}
export type AddAllergen = {type: "ADD_ALLERGEN", payload: string}

export type DishFormActions = UpdateName | UpdateDescription | UpdateBroughtBy | UpdateServes | AddAllergen

export function PotlukkFormReducer(state: DishFormState, action: DishFormActions):DishFormState{

    const nextState: DishFormState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "UPDATE_NAME":{
            nextState.dishes.name = action.payload;
            return nextState
        }
        case "UPDATE_DESCRIPTION":{
            nextState.dishes.description = action.payload;
            return nextState
        }
        case "UPDATE_BROUGHTBY":{
            nextState.dishes.broughtBy = action.payload;
            return nextState
        }
        case "UPDATE_SERVES":{
            nextState.dishes.serves = action.payload;
            return nextState
        }
        case "ADD_ALLERGEN":{
            nextState.dishes.allergens.push(action.payload)
            return nextState
        }
        
        default:{
            return nextState
        }
        
    }
}