
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
//remember to take in putlukk object as props
//prop typing error remember
export function PotlukkDetailHost(){
  const[update,setUpdate] = useState<boolean>(false)
  const {potlukk} = useParams()
  const sendDispatch = useDispatch()<PotlukkActions>
  const potlukkId = Number(potlukk);
  const selector = useSelector((store: LukkerUserState) => store)
  //console.log(selector.currentPotluck)
  const details = selector.currentPotluck.details
  //console.log(details)
  const initialState: PotlukkEditInputState = {
          potlukkId: potlukkId,
          title: details.title,
          location: details.location,
          status: details.status.toString(),
          description: details.description,
          isPublic: details.isPublic,
          time: details.time,
          tags: details.tags

  }
  useEffect(()=>{ // use effect for rest gets/ constant display
      sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: potlukkId}); // await since it rreturns a promise
  },[update]);
  
  const alert = useAlert();
  const router = useNavigate();
  
  const [FormState, dispatchForm] = useReducer(PotlukkEditFormReducer, initialState)

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
              <button onClick={() =>{sendDispatch({type:"REQUEST_EDIT_POTLUKK", payload: FormState});setUpdate(!update)}}>Update</button>
            </div>
            <div className="cancelPotlukk-container">
            {/* <button onClick={() =>dispatchForm({type:"UPDATE_CANCELLED", payload: "CANCELLED"})}>Delete</button> */}
            <button onClick={ () => alert.open({
              message: "Are you sure you want to cancel this Potlukk?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () =>{
                    dispatchForm({type:"UPDATE_CANCELLED", payload: "CANCELLED"})
                    alert.close()
                    router("/home")
                  },
                },
                {
                  label: "No",
                  onClick: () =>{
                    alert.close()
                  }
                },
              ]
            })}>Delete</button>
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
        </div>
        <div className="dishes-container">
            <div className="dishes-header-container">
                <h1>Dishes</h1>
            </div>
            <div className="dishes-list-container"></div>
            <div className="create-dish-container"></div>
        </div>
        <div className="attendee-container">
          <Attendees_Component />
        </div>
        <div>
          <h1>Invite</h1>
          <Invitation_Component/>
        </div>
      </div>
    </>

      );
}