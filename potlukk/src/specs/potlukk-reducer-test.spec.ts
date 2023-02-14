import { LukkerUserInfo, lukkerUserReducer, LukkerUserState } from "../reducers/potlukk-reducer"

const testState:LukkerUserState ={
    currentUser: {
        userId:0,
        username:"",
        fname:"",
        lname:"",
        allergies:[]
    },
    userList:[],
    error:false,
    newUserAdded:false
}


test("ADD user", ()=>{
    const testUser: LukkerUserInfo = {
        userId: 1502,
        username: "joe65",
        fname: "Joe",
        lname: "Smith",
        allergies: ["EGG","SOY"]
    }

    const nextState = lukkerUserReducer(testState,{type:"ADD_USER",payload:testUser});
    expect(nextState.userList.length).toBe(1)
})