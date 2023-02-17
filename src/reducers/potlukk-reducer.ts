import { SignInForm } from "../pages/signin-page";
import { DishFormState } from "./dish-form-reducer";
import { PotlukkEditInputState } from "./potluck-edit-form-reducer";
import { PotlukkCreationInputState } from "./potluck-form-reducer";
export enum PotlukkStatus {
    SCHEDULED,
    CANCELLED
}

export type Allergen = [
    "MILK"?,
    "EGG"?,
    "FISH"?,
    "SHELLFISH"?,
    "SOY"?,
    "WHEAT"?,
    "TREENUT"?
]

export enum InvitationStatus {
    ACCEPTED,
    MAYBE,
    DECLINED,
    PENDING
}

export enum NotificationKind {
    DISH_ADDED,
    DISH_REMOVED,
    POTLUKK_ALTERED,
    POTLUKK_CANCELED,
    INVITE_ACCEPTED,
    INVITE_DECLINE,
    INVITE_SENT
  }

export type PotlukkNotification ={
    eventId: number
    timestamp: number
    kind: NotificationKind
    description: string
    affectedPotlukkId: number
    createdByUser: number
}
  
export type PotlukkNotificationInput ={
    kind: string
    description: string
    affectedPotlukkId: number
    createdByUser: number
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
    allergens: string[]
}

export type DishesSwapInput = {
    potlukkId: number,
    dishes: Dishes[]
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

export type InvitationSendInput = {
    potlukkId: number,
    potlukkerId: number
}
//state held in this reducer
export type LukkerUserState = {
    currentUser: LukkerUserInfo
    currentPotluck: Potlukk
    userList: LukkerUserInfo[]

    error: boolean
    newUserAdded: boolean

    potlukkList: Potlukk[]
    invited: LukkerUserInfo[]
    filteredPotlukkList: Potlukk[]
    dishes: Dishes[]
    addedNotification: PotlukkNotification
    filteredNotificationList: PotlukkNotification[]
}

export type PotlukkDetails = {
    title: string
    location: string
    status: PotlukkStatus
    description: string
    isPublic: boolean
    time: number
    tags: string[]
  }

export type Potlukk = {
    potlukkId: number,
    details: PotlukkDetails,
    host: LukkerUserInfo,
    invitations: Invitation[],
    dishes: Dishes[]

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
export type SetCurrentPotlukk = {type: "SET_CURRENT_POTLUKK", payload: Potlukk}
export type GetUserByName = {type:"GET_USER_BY_NAME", payload: string}
export type AddPotlukk = {type:"ADD_POTLUKK", payload: Potlukk}
export type ClearInvited = {type:"CLEAR_INVITED"}
export type GetPotlukkDetails = {type:"GET_POTLUKK_DETAILS",payload:Potlukk[]}
export type SetNotificationAction = {type:"SET_NOTIFICATION",payload:PotlukkNotification}
export type SetNotificationList = {type:"SET_NOTIFICATION_LIST",payload:PotlukkNotification[]}
//Saga Actions
export type CreateUserAction = {type:"CREATE_USER", payload:CreateUserForm}
export type SignInUser = {type:"SIGN_IN_USER", payload:SignInForm}
export type RequestGetUsersAction = {type:"REQUEST_GET_USERS", payload: string}
export type RequestUserById = {type: "REQUEST_USER_BY_ID", payload: string}
export type RequestCreatePotlukk = {type: "REQUEST_CREATE_POTLUKK", payload: PotlukkCreationInputState}
export type RequestEditPotlukk = {type: "REQUEST_EDIT_POTLUKK", payload: PotlukkEditInputState}
export type RequestCancelPotlukk = {type: "REQUEST_CANCEL_POTLUKK", payload: PotlukkEditInputState}
export type RequestGetPotlukkById = {type: "REQUEST_GET_POTLUKK_BY_ID", payload:number}
export type RequestSwapDishes = {type: "REQUEST_SWAP_DISHES", payload: DishesSwapInput}
export type Refresh_Users = {type: "REFRESH_USERS"}
export type RequestPotlukkDetailsAction = {type:"REQUEST_POTLUKK_DETAILS"}
export type RequestCreateNotification = {type:"REQUEST_CREATE_NOTIFICATION",payload:PotlukkNotificationInput}
// Action types
export type PotlukkActions = CreateUserAction | GetUsersAction | AddUserAction | SetErrorAction
        | ClearErrorAction | ClearUserAdded | SetUser | SignInUser |
        RequestGetUsersAction | GetUserByName | Refresh_Users | AddPotlukk | RequestCreatePotlukk
        | InviteUserAction | DeleteInvitedAction | RequestEditPotlukk | ClearInvited | RequestPotlukkDetailsAction 
        | GetPotlukkDetails | SetCurrentPotlukk | RequestGetPotlukkById | RequestCancelPotlukk
        | RequestSwapDishes | RequestCreateNotification | SetNotificationAction | SetNotificationList;


export const initialState: LukkerUserState = {
    currentUser: {
        userId: 0,

        username:  '',
        fname:     '',
        lname:     '',
        allergies: []
    },
    currentPotluck: {
        potlukkId: 123,
        details:{
          title: "",
          location: "",
          status: PotlukkStatus.CANCELLED,
          description: "testPotluck",
          isPublic: false,
          time: 0,
          tags: [
            "this is a test"
          ]
        },
        host: {
          userId: 0,
          username: "",
          fname: "John",
          lname: "Smith",
          allergies: [
          ]
        },
        invitations: [],
        dishes: []
      },
    userList:[],
    error:false,
    newUserAdded:false,
    potlukkList: [],
    invited: [],
    filteredPotlukkList: [],
    dishes: [],

    addedNotification: {
        affectedPotlukkId:0,
        createdByUser:0,
        description:"",
        kind:NotificationKind.INVITE_SENT,
        eventId:0,
        timestamp:0
    },
    filteredNotificationList:[]
}

export function lukkerUserReducer(state: LukkerUserState = initialState, action: PotlukkActions):LukkerUserState{
    const nextState: LukkerUserState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "GET_POTLUKK_DETAILS":{
            const result = action.payload.filter(filterByAttending)
            //localStorage.setItem("filteredList",JSON.stringify(result))
            //console.log(result)
            localStorage.removeItem("filteredList")
            nextState.filteredPotlukkList = result
            return nextState
        }

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
            nextState.potlukkList[0]=(action.payload)
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
            if(action.payload.userId===0){
                localStorage.removeItem("username")
                localStorage.removeItem("userid")
            }else{
                localStorage.setItem("username",action.payload.username)
                localStorage.setItem("userid",action.payload.userId.toString())
            }
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
        case "CLEAR_INVITED":{
            nextState.invited = []
            return nextState
        }
        case "SET_CURRENT_POTLUKK":{
            nextState.currentPotluck = action.payload
            //console.log("from reducer"+action.payload.potlukkId)
            return nextState
        }
        case "SET_NOTIFICATION":{
            nextState.addedNotification = action.payload
            //console.log(action.payload)
            return nextState
        }
        case "SET_NOTIFICATION_LIST":{
            const result = action.payload.filter(filterByNotification)
            nextState.filteredNotificationList = result
            console.log(result)
            return nextState
        }
        default:
            return nextState
    }

    function filterByAttending(potlukk:Potlukk){
        const result = potlukk.host.userId === Number(localStorage.getItem("userid")) || 
        potlukk.invitations.some(e=>e.potlukker.userId === Number(localStorage.getItem("userid")))
        //console.log(nextState.currentUser)
        return result
    }

    function filterByNotification(note:PotlukkNotification){
        const result = nextState.filteredPotlukkList.some(pt=>pt.potlukkId===note.affectedPotlukkId)
        return result
    }

}











