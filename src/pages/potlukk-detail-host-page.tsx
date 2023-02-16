
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";
import Calendar from 'react-calendar';
//import "../stylesheets/potlukk-detail-host-style.css"
import 'react-calendar/dist/Calendar.css';
import { NavBar } from "./navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert-with-buttons";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotlukkEditFormReducer, PotlukkEditInputState } from "../reducers/potluck-edit-form-reducer";
import { Invitation_Component } from "../components/invitation_component";
import { Attendees_Component } from "../components/attendees_component";
import { Dishes_Component } from "../components/dishes-component";

export function PotlukkDetailHost(){
  const sendDispatch = useDispatch()<PotlukkActions>
  const alert = useAlert();
  const router = useNavigate();
  const {potlukk} = useParams();
  const potlukkId = Number(potlukk);
  let initialState: PotlukkEditInputState = {
    potlukkId: potlukkId,
    title: "",
    location: "",
    status: "SCHEDULED",
    description: "",
    isPublic: false,
    time: 0,
    tags: []

  }
  const [FormState, dispatchForm] = useReducer(PotlukkEditFormReducer, initialState)

  const selector = useSelector((store: LukkerUserState) => store)

  const details = selector.currentPotluck.details
  
  const [tagInput, setTagInput]= useState("")
  let date = new Date(FormState.time * 1000)

    return (
    <>
      <NavBar/>
      <div className="container">
        <div className="calendar-container">
            <div className="date-container">
                <div className="date-header">
                    <h1>Date</h1>
                </div>
                <div className="date-output-container">
                  {date.toString()}
                </div>
            </div>
            <div className="calendar-input-container">
              <Calendar onChange={(value: any,event: any) => dispatchForm({type: "UPDATE_TIME",payload: value.getTime() /1000})}/>
            </div>
            <div className="updatePotlukk-container">
              <button onClick={() =>{sendDispatch({type:"REQUEST_EDIT_POTLUKK", payload: FormState})}}>Update</button>
            </div>
            <div className="cancelPotlukk-container">
            {/* <button onClick={()=> dispatchForm({type:"UPDATE_CANCELLED"})}>testCancel</button> */}
            <button onClick={ () => alert.open({
              message: "Are you sure you want to cancel this Potlukk?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () =>{
                    sendDispatch({type:"REQUEST_CANCEL_POTLUKK", payload: FormState});
                    alert.close();
                    router("/home");
                  },
                },
                {
                  label: "No",
                  onClick: () =>{
                    alert.close()
                  }
                },
              ]
            })}>Cancel</button>
            </div>
        </div>
        <div className="editPotlukk-container">
            <div className="editTitle-container">
              <label>Title</label>
              <input value={FormState.title} onChange={(e) =>dispatchForm({type:"UPDATE_TITLE", payload: e.target.value})}></input>
            </div>
            <div className="editLocation-container">
              <label>Location</label>
              <input value={FormState.location} onChange={(e) =>dispatchForm({type:"UPDATE_LOCATION", payload: e.target.value})}></input>
            </div>
            <div className="editDescription-container">
              <label>Description</label>
              <input value={FormState.description} onChange={(e) =>dispatchForm({type:"UPDATE_DESCRIPTION", payload: e.target.value})}></input>
            </div>
            <div className="isPublic-container">
              <label>Make Public</label>
              {(FormState.isPublic) ? 
                <input type="checkbox" onChange={() =>FormState.isPublic ? 
                        dispatchForm({type:"UPDATE_ISPUBLIC", payload: false}) : 
                        dispatchForm({type:"UPDATE_ISPUBLIC", payload: true})} checked></input> 
                        :
                <input type="checkbox" onChange={() =>FormState.isPublic ? 
                        dispatchForm({type:"UPDATE_ISPUBLIC", payload: false}) : 
                        dispatchForm({type:"UPDATE_ISPUBLIC", payload: true})}></input>}
            </div>
            <div className="tags-container">
                <div className="tags-input-container">
                    <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input>
                </div>
                <div className="tagsbutton-container">
                    <button onClick={(e)=>dispatchForm({type:"ADD_TAG", payload: tagInput})}>add tag</button>
                </div>
                <div className="tagsshow-container">
                    <div>{FormState.tags}</div>
                </div>
            </div>
        </div>
        <div className="dishes-container">
            <div className="dishes-header-container">
                <h1>Dishes</h1>
            </div>
            <div className="dishes-list-container">
        
              <Dishes_Component number={potlukkId}/>
            </div>
            <div className="create-dish-container"></div>
        </div>
        <div className="attendee-container">
          <Attendees_Component number={potlukkId}/>
        </div>
        <div>
          <h1>Invite</h1>
          <Invitation_Component/>
        </div>
      </div>
    </>

      );
}