
import { useState, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotlukkFormReducer } from "../reducers/potluck-form-reducer"
import { PotlukkActions ,LukkerUserState, PotlukkStatus } from "../reducers/potlukk-reducer"
import { PotlukkCreationInputState } from "../reducers/potluck-form-reducer";

export function Hostpage(){
    const selector = useSelector((store: LukkerUserState) => store)
    const initialState: PotlukkCreationInputState = {
        details: {
            title: "",
            location: "",
            status: "SCHEDULED",
            description: "",
            isPublic: false,
            time: 0,
            tags: []
        },
        hostId: 78617//selector.currentUser.userId

    }
    
    const [FormState, dispatchForm] = useReducer(PotlukkFormReducer, initialState)


    const sendDispatch = useDispatch()<PotlukkActions>
    const [tagInput, setTagInput]= useState("")

    return(
        <>
            <button onClick={() => sendDispatch({type: "REQUEST_CREATE_POTLUKK", payload: FormState})}>CREATE</button>
            <input placeholder="title" onChange={(e)=>dispatchForm({type:"UPDATE_TITLE", payload: e.target.value})}></input>
            <input placeholder="location" onChange={(e)=>dispatchForm({type:"UPDATE_LOCATION", payload: e.target.value})}></input>
            <input placeholder="description" onChange={(e)=>dispatchForm({type:"UPDATE_DESCRIPTION", payload: e.target.value})}></input>
            <input placeholder="public" type="checkbox" onChange={() =>FormState.details.isPublic ? dispatchForm({type:"UPDATE_ISPUBLIC", payload: false}) : dispatchForm({type:"UPDATE_ISPUBLIC", payload: true})}></input>
            <input placeholder="time" onChange={(e)=>dispatchForm({type:"UPDATE_TIME", payload: Number(e.target.value)})}></input>

            <button onClick={(e)=>dispatchForm({type:"ADD_TAG", payload: tagInput})}>add tag</button>
            <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input>
            <div>{FormState.details.tags}</div>
            

        </>
    )
}