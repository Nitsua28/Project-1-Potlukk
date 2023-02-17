
export type PotlukkCreationInputState = {
    details:{
        title: string,
        location: string,

        status: string,
        description: string,
        isPublic: Boolean,
        time: number,
        tags: string[]
        
    }
    hostId: number
}

export type UpdateTitle = {type: "UPDATE_TITLE", payload:string}
export type UpdateLocation = {type: "UPDATE_LOCATION", payload:string}
export type UpdateCancelledAction = {type:"UPDATE_CANCELLED", payload:"CANCELLED"}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateIsPublic = {type: "UPDATE_ISPUBLIC", payload: boolean}
export type UpdateTime = {type: "UPDATE_TIME", payload: number}
export type AddTag = {type: "ADD_TAG", payload: string}
export type DeleteTag = {type: "DELETE_TAG", payload: string}

export type PotlukkCreationInputFormActions = UpdateDescription | UpdateIsPublic | UpdateLocation | UpdateCancelledAction | UpdateTitle | UpdateTime | AddTag

export function PotlukkFormReducer(state: PotlukkCreationInputState, action: PotlukkCreationInputFormActions):PotlukkCreationInputState{

    const nextState: PotlukkCreationInputState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "UPDATE_TITLE":{
            nextState.details.title = action.payload;
            return nextState
        }
        case "UPDATE_LOCATION":{
            nextState.details.location = action.payload;
            return nextState
        }
        case "UPDATE_CANCELLED":{
            nextState.details.status = action.payload;
            return nextState
        }
        case "UPDATE_DESCRIPTION":{
            nextState.details.description = action.payload;
            return nextState
        }
        case "UPDATE_ISPUBLIC":{
            nextState.details.isPublic = action.payload;
            return nextState
        }
        case "UPDATE_TIME":{
            nextState.details.time = action.payload;
            return nextState
        }
        case "ADD_TAG":{
            nextState.details.tags.push(action.payload);
            return nextState
        }
        
        // case "DELETE_TAG":{
        default:{
            return nextState
        }
        
    }
}