

enum Allergen {
    MILK,
    EGG,
    FISH,
    SHELLFISH,
    SOY,
    WHEAT,
    TREENUT
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

// Generated by https://quicktype.io

export type CreateUserForm = {
    username:  string;
    password:  string;
    fname:     string;
    lname:     string;
    allergies: string[];
}

export type LukkerUserState = {
    currentUser: LukkerUserInfo
    userList: LukkerUserInfo[]

}

//Reducer Actions 
export type GetUsersAction = {type:"GET_USERS", payload:LukkerUserInfo[]}
export type AddUserAction = {type:"ADD_USER", payload:LukkerUserInfo}

//Saga Actions
export type CreateUserAction = {type:"CREATE_USER", payload:CreateUserForm}

// Action types
export type PotlukkActions = CreateUserAction | GetUsersAction | AddUserAction

const initialState: LukkerUserInfo[] = [];

export function lukkerUserReducer(state: LukkerUserInfo[] = initialState, action: PotlukkActions):LukkerUserInfo[]{
    const nextState: LukkerUserInfo[] = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "ADD_USER":{

            return nextState
        }
        case "GET_USERS": {

            return nextState
        }
        default:
            return nextState
    }


}


