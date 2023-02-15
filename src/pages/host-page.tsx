
import { useState, useReducer, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotlukkFormReducer } from "../reducers/potluck-form-reducer"
import { PotlukkActions ,LukkerUserState, PotlukkStatus, LukkerUserInfo } from "../reducers/potlukk-reducer"
import { PotlukkCreationInputState } from "../reducers/potluck-form-reducer";
import Calendar from 'react-calendar'
import "../stylesheets/style.css"
import 'react-calendar/dist/Calendar.css';
import { Invitation_Component } from "../components/invitation_component";
import { NavBar } from "./navbar";
export function Hostpage(){
    
    const lukkerSelector = useSelector((store: LukkerUserState) => store)
  
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
        hostId: lukkerSelector.currentUser.userId

    }
    
    const [FormState, dispatchForm] = useReducer(PotlukkFormReducer, initialState)


    const sendDispatch = useDispatch()<PotlukkActions>
    const [tagInput, setTagInput]= useState("")
    
    
    
    // function filterUsers(){
    //     tempArray = selector.userList.filter((item) => item.username === form)
    // }
    

    
    const date = new Date(FormState.details.time * 1000)


    return(
        <>
            <NavBar/>
            <div>{FormState.hostId}</div>
            <div className="container">
                <div className="calendar-container">
                    <div className="date-input-container">
                        <div className="date-header-container">
                            TIME/DATE
                        </div>
                        <div className="date-inputbox-container">
                            {date.toString()}
                        </div>
                    </div>
                    <div className="calendar-box-container">
                        <Calendar onChange={(value: any,event: any) => dispatchForm({type: "UPDATE_TIME",payload: value.getTime() /1000})}/>
                    </div>
                </div>
                <div className="meta-info-container">
                    <div className="title-input-container">
                        <input placeholder="title" onChange={(e)=>dispatchForm({type:"UPDATE_TITLE", payload: e.target.value})}></input>
                    </div>
                    <div className="location-input-container">
                        <input placeholder="location" onChange={(e)=>dispatchForm({type:"UPDATE_LOCATION", payload: e.target.value})}></input>
                    </div>
                    <div className="description-input-container">
                        <input placeholder="description" onChange={(e)=>dispatchForm({type:"UPDATE_DESCRIPTION", payload: e.target.value})}></input>
                    </div>
                    <div className="isPublic-container">
                        <input placeholder="public" type="checkbox" onChange={() =>FormState.details.isPublic ? dispatchForm({type:"UPDATE_ISPUBLIC", payload: false}) : dispatchForm({type:"UPDATE_ISPUBLIC", payload: true})}></input>
                        <div>Make Public</div>
                    </div>
                    <div className="tags-container">
                        <div className="tags-input-container">
                            <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input>
                        </div>
                        <div className="tagsbutton-container">
                            <button onClick={(e)=>dispatchForm({type:"ADD_TAG", payload: tagInput})}>add tag</button>
                        </div>
                        <div className="tagsshow-container">
                            <div>{FormState.details.tags}</div>
                        </div>
                    </div>
                    <div className="createbutton-container">
                        <button onClick={() => sendDispatch({type: "REQUEST_CREATE_POTLUKK", payload: FormState})}>CREATE</button>
                    </div>

                </div>
                <div className="invite-lukkers-container">

                    <Invitation_Component/>

                </div>
                
            </div>
        </>
    )
}