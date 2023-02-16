
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
export type UpdateCancelledAction = {type:"UPDATE_CANCELLED"}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateIsPublic = {type: "UPDATE_ISPUBLIC", payload: boolean}
export type UpdateTime = {type: "UPDATE_TIME", payload: number}
export type AddTag = {type: "ADD_TAG", payload: string}
export type DeleteTag = {type: "DELETE_TAG", payload: string}

export type PotlukkEditInputFormActions = UpdateDescription | UpdateIsPublic | UpdateLocation |
 UpdateCancelledAction | UpdateTitle | UpdateTime | AddTag

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
            console.log("step 2");
            nextState.status = "CANCELLED";
            console.log(nextState.status)
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
        
        // case "DELETE_TAG":{
        default:{
            return nextState
        }
        
    }
}