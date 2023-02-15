import { InvitationStatus, LukkerUserInfo, lukkerUserReducer, LukkerUserState, Potlukk } from "../reducers/potlukk-reducer"
import {PotlukkCreationInputState} from "../reducers/potluck-form-reducer"

const testState:LukkerUserState ={
    currentUser: {
        userId:0,
        username:"",
        fname:"",
        lname:"",
        allergies:[]
    },
    currentPotluck: {
        potlukkId: 178540,
        details: {
          details:{
          title: "chicken",
          location: "atPotlukkk",
          status: "SCHEDULED",
          description: "peiece of meat",
          isPublic: false,
          time: 9,
          tags: [
            "akdna"
          ]
        },
        hostId: 56452
      },
        host: {
          userId: 56452,
          username: "Host",
          fname: "Joe",
          lname: "Biden",
          allergies: [
            "MILK"
          ]
        },
        invitations: [
          {
            status: InvitationStatus.PENDING,
            potlukker: {
              userId: 56452,
              username: "Host",
              fname: "Joe",
              lname: "Biden",
              allergies: [
                "MILK"
              ]
            }
          }
        ],
        dishes: []
      },
    potlukkList: [],
    userList:[],
    invited: [],

    error:false,
    newUserAdded:false,
    filteredPotlukkList: []
}

const testU1:LukkerUserInfo ={
    username: "bob23",
    userId: 80594,
    allergies: [
      "EGG",
      "SHELLFISH",
      "SOY"
    ],
    fname: "",
    lname: ""
}

const testU2:LukkerUserInfo ={
    userId: 41797,
    username: "joe62",
    fname: "",
    lname: "",
    allergies: [
      "EGG",
      "SHELLFISH"
    ]
} 

const testU3:LukkerUserInfo ={
    userId: 86991,
    username: "george27",
    fname: "",
    lname: "",
    allergies: [
      "EGG",
      "SHELLFISH"
    ]
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

test("GET users", ()=>{
    const getUsers:LukkerUserInfo[] = [testU1,testU2,testU3]

    const nextState = lukkerUserReducer(testState,{type:"GET_USERS",payload:getUsers})
    expect(nextState.userList.length).toBe(3)
    expect(nextState.userList.some(e=>e.userId===86991)).toBe(true)
    expect(nextState.userList.some(e=>e.userId===41797)).toBe(true)
    expect(nextState.userList.some(e=>e.userId===80594)).toBe(true)
})

const testPotlukkDetails:PotlukkCreationInputState = {
    details: {
        title: "Birthday bash",
        location: "Park",
        status: "SCHEDULED",
        description: "Birng gift",
        isPublic: false,
        time: 1677567600,
        tags: ["fun"]
        
    },
    hostId: 85694
}

test("ADD potlukk", ()=>{
    const teastPotlukk: Potlukk = {
        potlukkId: 12588,
        details:testPotlukkDetails,
        host: testU3,
        invitations:[],
        dishes:[]
    }

    const nextState = lukkerUserReducer(testState,{type:"ADD_POTLUKK",payload:teastPotlukk});
    expect(nextState.potlukkList.length).toBe(1);
})