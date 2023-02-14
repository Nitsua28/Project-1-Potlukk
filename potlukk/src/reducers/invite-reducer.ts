
import { LukkerUserInfo } from "./potlukk-reducer"

export type InvitationSendInput = {
    potlukkId: number,
    potlukkerId: number
}
export type InvitationInputState = {
    Invited: LukkerUserInfo[]
}
//Regular actions
export type InviteButtonAction = {type: "INVITE_BUTTON", payload: number}
export type DeleteButtonAction = {type: "DELETE_BUTTON", payload: number}
//Saga actions
export type RequestInviteButtonAction = {type: "REQUEST_INVITE_BUTTON", payload: number}
export type RequestDeleteButtonAction = {type: "REQUEST_DELETE_BUTTON", payload: number}
export type InvitationSendInputActions = InviteButtonAction | DeleteButtonAction | RequestInviteButtonAction |
RequestDeleteButtonAction

export function InvitationSendInputReducer(state: InvitationInputState, action: InvitationSendInputActions): InvitationInputState{
    const nextState: InvitationInputState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "INVITE_BUTTON":{
            return nextState
        }
        default:{
            return nextState
        }
    }
    
}
