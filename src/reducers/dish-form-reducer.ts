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
export type AddAllergen = {type: "ADD_ALLERGEN", payload: number}
export type DeleteAllergen = {type: "DELETE_ALLERGEN", payload: number}
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
            let word = "";
            switch(action.payload){
                case (Allergen.MILK):{
                    word = "MILK"
                    break;
                }
                case (Allergen.EGG):{
                    word = "EGG"
                    break;
                }
                case (Allergen.FISH):{
                    word = "FISH"
                    break;
                }
                case (Allergen.SHELLFISH):{
                    word = "SHELLFISH"
                    break;
                }
                case (Allergen.SOY):{
                    word = "SOY"
                    break;
                }
                case (Allergen.WHEAT):{
                    word = "WHEAT"
                    break;
                }
                case (Allergen.TREE_NUT):{
                    word = "TREE_NUT"
                    break;
                }
            }

            (!(nextState.allergens.some((item) => item === word))) &&
            nextState.allergens.push(word);
            return nextState
        }
        case "DELETE_ALLERGEN":{
            let word = "";
            switch(action.payload){
                case (Allergen.MILK):{
                    word = "MILK"
                    break;
                }
                case (Allergen.EGG):{
                    word = "EGG"
                    break;
                }
                case (Allergen.FISH):{
                    word = "FISH"
                    break;
                }
                case (Allergen.SHELLFISH):{
                    word = "SHELLFISH"
                    break;
                }
                case (Allergen.SOY):{
                    word = "SOY"
                    break;
                }
                case (Allergen.WHEAT):{
                    word = "WHEAT"
                    break;
                }
                case (Allergen.TREE_NUT):{
                    word = "TREE_NUT"
                    break;
                }
            }
            let newAllergens: string[] = nextState.allergens.filter((item)=>item !== word);
            nextState.allergens = newAllergens;
            return nextState
        }
        
        default:{
            return nextState
        }
        
    }
}