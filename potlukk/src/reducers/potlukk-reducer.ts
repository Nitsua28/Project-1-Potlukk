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
    TREENUT
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
    potlukkList: PotlukkCreationInputState[]

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
export type GetUserByName = {type:"GET_USER_BY_NAME", payload: string}
export type AddPotlukk = {type:"ADD_POTLUKK", payload: PotlukkCreationInputState}
// export type AddInvitations
//Saga Actions
export type CreateUserAction = {type:"CREATE_USER", payload:CreateUserForm}
export type RequestGetUsersAction = {type:"REQUEST_GET_USERS", payload: string}
export type RequestCreatePotlukk = {type: "REQUEST_CREATE_POTLUKK", payload: PotlukkCreationInputState}
export type Refresh_Users = {type: "REFRESH_USERS"}
// Action types
export type PotlukkActions = CreateUserAction | GetUsersAction | AddUserAction|
RequestGetUsersAction | GetUserByName | Refresh_Users | AddPotlukk | RequestCreatePotlukk

const initialState: LukkerUserState = {
    currentUser: {
        userId: 0,
        username:  '',
        fname:     '',
        lname:     '',
        allergies: []
    },
    userList: [],
    potlukkList: []
};

export function lukkerUserReducer(state: LukkerUserState = initialState, action: PotlukkActions):LukkerUserState{
    const nextState: LukkerUserState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "ADD_USER":{
            nextState.userList.push(action.payload)
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

        
        default:
            return nextState
    }


}





