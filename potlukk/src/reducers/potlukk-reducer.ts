import { SignInForm } from "../pages/signin-page";
import { PotlukkCreationInputState } from "./potluck-form-reducer";
export enum PotlukkStatus {
    SCHEDULED,
    CANCELLED
}

export enum Allergen {
    MILK,
    EGG,
    FISH,
    SHELLFISH,
    SOY,
    WHEAT,
    TREE_NUT
}

export enum InvitationStatus {
    ACCEPTED,
    MAYBE,
    DECLINED,
    PENDING
}

// Generated by https://quicktype.io

export type Error = {
    detail: Detail[];
}

export type Detail = {
    loc:  Array<number | string>;
    msg:  string;
    type: string;
}


// Generated by https://quicktype.io


export type LukkerUserInfo = {
    userId:    number;
    username:  string;
    fname:     string;
    lname:     string;
    allergies: string[];
}

export type Dishes = {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens: Allergen
}
// Generated by https://quicktype.io

export type CreateUserForm = {
    username:  string;
    password:  string;
    fname:     string;
    lname:     string;
    allergies: string[];
}
export type Invitation = {
    status: InvitationStatus,
    potlukker: LukkerUserInfo,
}

export type LukkerUserState = {
    currentUser: LukkerUserInfo
    userList: LukkerUserInfo[]

    error: boolean
    newUserAdded: boolean

    potlukkList: PotlukkCreationInputState[]
    invited: LukkerUserInfo[]

}

export type Potlukk = {
    details: PotlukkCreationInputState,
    host: LukkerUserInfo,
    invitations: Invitation[],
    dishes: Dishes

}

//Reducer Actions 
export type GetUsersAction = {type:"GET_USERS", payload: LukkerUserInfo[]}
export type AddUserAction = {type:"ADD_USER", payload:LukkerUserInfo}
export type InviteUserAction = {type: "INVITE_USER_ACTION", payload: string}
export type DeleteInvitedAction = {type: "DELETE_INVITED_ACTION", payload: string}
export type SetErrorAction = {type:"ERROR", payload:boolean}
export type ClearErrorAction = {type:"CLEAR_ERROR"}
export type ClearUserAdded = {type:"CLEAR_USER_ADDED"}
export type SetUser = {type:"SET_USER", payload:LukkerUserInfo}
export type GetUserByName = {type:"GET_USER_BY_NAME", payload: string}
export type AddPotlukk = {type:"ADD_POTLUKK", payload: PotlukkCreationInputState}
//Saga Actions
export type CreateUserAction = {type:"CREATE_USER", payload:CreateUserForm}
export type SignInUser = {type:"SIGN_IN_USER", payload:SignInForm}
export type RequestGetUsersAction = {type:"REQUEST_GET_USERS", payload: string}
export type RequestUserById = {type: "REQUEST_USER_BY_ID", payload: string}
export type RequestCreatePotlukk = {type: "REQUEST_CREATE_POTLUKK", payload: PotlukkCreationInputState}
export type Refresh_Users = {type: "REFRESH_USERS"}
// Action types
export type PotlukkActions = CreateUserAction | GetUsersAction | AddUserAction | SetErrorAction
        | ClearErrorAction | ClearUserAdded | SetUser | SignInUser |
        RequestGetUsersAction | GetUserByName | Refresh_Users | AddPotlukk | RequestCreatePotlukk
        |InviteUserAction | DeleteInvitedAction;

const initialState: LukkerUserState = {
    currentUser: {
        userId: 0,

        username:  '',
        fname:     '',
        lname:     '',
        allergies: []
    },
    userList:[],
    error:false,
    newUserAdded:false,
    potlukkList: [],
    invited: []
}

export function lukkerUserReducer(state: LukkerUserState = initialState, action: PotlukkActions):LukkerUserState{
    const nextState: LukkerUserState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "ADD_USER":{
            nextState.userList.push(action.payload)
            nextState.newUserAdded = true
            nextState.currentUser = action.payload
            return nextState
        }
        case "GET_USERS": {
            nextState.userList = action.payload
            return nextState
        }
        case "ADD_POTLUKK": {
            nextState.potlukkList.push(action.payload)
            return nextState
        }

        case "ERROR":{
            nextState.error = action.payload
            return nextState
        }
        case "CLEAR_ERROR":{
            nextState.error = false;
            return nextState
        }
        case "CLEAR_USER_ADDED":{
            nextState.newUserAdded = false;
            return nextState
        }
        case "SET_USER":{
            nextState.currentUser = action.payload
            return nextState
        }
        case "INVITE_USER_ACTION":{
            let users: LukkerUserInfo[] = nextState.userList.filter((item)=>item.userId === Number(action.payload));
    
            (!(nextState.invited.some((item) => item.userId === users[0].userId))) &&
            nextState.invited.push(users[0])
                //some method implement
            return nextState
        }
        case "DELETE_INVITED_ACTION":{
            let users: LukkerUserInfo[] = nextState.invited.filter((item)=>item.userId !== Number(action.payload));
            nextState.invited = users
            return nextState
        }
        default:
            return nextState
    }


}






