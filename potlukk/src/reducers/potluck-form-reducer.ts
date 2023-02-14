
import { LukkerUserInfo, PotlukkStatus } from "./potlukk-reducer"

export type InvitedPeople = {
    listArr: LukkerUserInfo[] 
}
export type PotlukkCreationInputState = {
    details:{
        title: string,
        location: string,
        // scheduled: boolean,
        // cancelled: boolean,
        status: string,
        description: string,
        isPublic: Boolean,
        time: string,
        tags: string[]
        
    }
    hostId: number
}

export type UpdateTitle = {type: "UPDATE_TITLE", payload:string}
export type UpdateLocation = {type: "UPDATE_LOCATION", payload:string}
export type UpdateScheduledAction = {type:"UPDATE_SCHEDULED", payload:"SCHEDULED"}
export type UpdateCancelledAction = {type:"UPDATE_CANCELLED", payload:"CANCELLED"}
export type UpdateDescription = {type: "UPDATE_DESCRIPTION", payload: string}
export type UpdateIsPublic = {type: "UPDATE_ISPUBLIC", payload: boolean}
export type UpdateTime = {type: "UPDATE_TIME", payload: string}
export type AddTag = {type: "ADD_TAG", payload: string}
export type DeleteTag = {type: "DELETE_TAG", payload: string}
export type InviteButtonAction = {type: "INVITE_BUTTON_ACTION", payload: number}
export type PotlukkCreationInputFormActions = UpdateDescription | UpdateIsPublic | UpdateLocation |
UpdateScheduledAction| UpdateCancelledAction | UpdateTitle | UpdateTime | AddTag | InviteButtonAction

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
        case "UPDATE_SCHEDULED":{
            nextState.details.status = action.payload;
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
        // case "INVITE_BUTTON_ACTION":{
            
        // }
        // case "DELETE_TAG":{
        default:{
            return nextState
        }
        
    }
}