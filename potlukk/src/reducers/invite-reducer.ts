import { LukkerUserInfo } from "./potlukk-reducer"

export type InvitationSendInputState = {
    potlukkId: number,
    potlukkerId: number
}
//Regular actions
export type InviteButtonAction = {type: "INVITE_BUTTON", payload: InvitationSendInputState}
export type DeleteButtonAction = {type: "DELETE_BUTTON", payload: InvitationSendInputState}
//Saga actions
export type RequestInviteButtonAction = {type: "REQUEST_INVITE_BUTTON", payload: InvitationSendInputState}
export type RequestDeleteButtonAction = {type: "REQUEST_DELETE_BUTTON", payload: InvitationSendInputState}
export type InvitationSendInputActions = InviteButtonAction | DeleteButtonAction | RequestInviteButtonAction |
RequestDeleteButtonAction

// export function InvitationSendInputReducer(state: InvitationSendInputState, action: InvitationSendInputActions): InvitationSendInputState{
//     const nextState: InvitationSendInputState = JSON.parse(JSON.stringify(state));

//     switch(action.type){
//         case "INVITE_BUTTON":{

//         }
//     }
// }