
export type PotlukkEditInputState = {
        potlukkId: number,
        title: string,
        location: string,
        status: string,
        description: string,
        isPublic: Boolean,
        time: number,
        tags: string[]
        
}

export type UpdateTitle = {type: "UPDATE_TITLE", payload:string}
export type UpdateLocation = {type: "UPDATE_LOCATION", payload:string}
export type UpdateCancelledAction = {type:"UPDATE_CANCELLED", payload:"CANCELLED"}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateIsPublic = {type: "UPDATE_ISPUBLIC", payload: boolean}
export type UpdateTime = {type: "UPDATE_TIME", payload: number}
export type AddTag = {type: "ADD_TAG", payload: string}
export type DeleteTag = {type: "DELETE_TAG", payload: string}
export type LoadEdit = {type:"LOAD_EDIT_FORM", payload:PotlukkEditInputState}

export type PotlukkEditInputFormActions = UpdateDescription | UpdateIsPublic | UpdateLocation |
 UpdateCancelledAction | UpdateTitle | UpdateTime | AddTag | LoadEdit

export function PotlukkEditFormReducer(state: PotlukkEditInputState, action: PotlukkEditInputFormActions):PotlukkEditInputState{

    const nextState: PotlukkEditInputState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "UPDATE_TITLE":{
            nextState.title = action.payload;
            return nextState
        }
        case "UPDATE_LOCATION":{
            nextState.location = action.payload;
            return nextState
        }
        case "UPDATE_CANCELLED":{
            nextState.status = action.payload;
            return nextState
        }
        case "UPDATE_DESCRIPTION":{
            nextState.description = action.payload;
            return nextState
        }
        case "UPDATE_ISPUBLIC":{
            nextState.isPublic = action.payload;
            return nextState
        }
        case "UPDATE_TIME":{
            nextState.time = action.payload;
            return nextState
        }
        case "ADD_TAG":{
            nextState.tags.push(action.payload);
            return nextState
        }

        case "LOAD_EDIT_FORM":{
            nextState.potlukkId = action.payload.potlukkId;
            nextState.title = action.payload.title;
            nextState.location = action.payload.location;
            nextState.status = action.payload.status;
            nextState.description = action.payload.description;
            nextState.isPublic = action.payload.isPublic;
            nextState.time = action.payload.time;
            nextState.tags = action.payload.tags;
            return nextState
        }
        
        // case "DELETE_TAG":{
        default:{
            return nextState
        }
        
    }
}