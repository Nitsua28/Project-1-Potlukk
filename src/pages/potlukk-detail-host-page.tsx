
import { Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";
import Calendar from 'react-calendar';
//import "../stylesheets/potlukk-detail-host-style.css"
import 'react-calendar/dist/Calendar.css';
import { NavBar } from "./navbar";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert-with-buttons";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { PotlukkEditFormReducer, PotlukkEditInputState } from "../reducers/potluck-edit-form-reducer";
import { Invitation_Component } from "../components/invitation_component";
//remember to take in putlukk object as props
//prop typing error remember
export function PotlukkDetailHost(potlukkProps: Potlukk){
     const propsDetails = potlukkProps.details.details;
    
    const initialState: PotlukkEditInputState = {
          potlukkId: potlukkProps.potlukkId,
          title: propsDetails.title,
          location: propsDetails.location,
          status: propsDetails.status,
          description: propsDetails.description,
          isPublic: propsDetails.isPublic,
          time: propsDetails.time,
          tags: propsDetails.tags

  }
  const alert = useAlert();
  const router = useNavigate();
  
  const [FormState, dispatchForm] = useReducer(PotlukkEditFormReducer, initialState)

  let date = new Date(FormState.time * 1000)
  const sendDispatch = useDispatch()<PotlukkActions>

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
              <button onClick={() =>sendDispatch({type:"REQUEST_EDIT_POTLUKK", payload: FormState})}>Update</button>
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
          <h1>Attendees</h1>
          <div>
            {potlukkProps.invitations.map(
              (item) => <li key={item.potlukker.userId}> {item.potlukker.username} {item.status}</li>
            )}
          </div>
        </div>
        <div>
          <h1>Invite</h1>
          <Invitation_Component/>
        </div>
      </div>
    </>

      );
}