
import { LukkerUserState, PotlukkStatus } from "./potlukk-reducer"

export type PotlukkCreationInputState = {
    details:{
        title: string,
        location: string,
        status: PotlukkStatus,
        description: string,
        isPublic: Boolean,
        time: number,
        tags: string[]
        
    }
    hostId: number
}

export type UpdateTitle = {type: "UPDATE_TITLE", payload:string}
export type UpdateLocation = {type: "UPDATE_LOCATION", payload:string}
export type UpdateStatus = {type: "UPDATE_STATUS", payload: PotlukkStatus}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateIsPublic = {type: "UPDATE_ISPUBLIC", payload: boolean}
export type UpdateTime = {type: "UPDATE_TIME", payload: number}
export type UpdateTags = {type: "UPDATE_TAGS", payload: string[]}
export type PotlukkCreationInputFormActions = UpdateDescription | UpdateIsPublic | UpdateLocation |
UpdateStatus | UpdateTitle | UpdateTime | UpdateTags

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
        case "UPDATE_STATUS":{
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
        case "UPDATE_TAGS":{
            nextState.details.tags = action.payload;
            return nextState
        }
    }
}