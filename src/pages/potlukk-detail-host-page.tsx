
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
import { getPotlukkByIdForm } from "../sagas/potlukk-saga";
import { getPotlukkById } from "../api/potlukk-requests";
import { potlukkJson } from "../components/empty_states";
//remember to take in putlukk object as props
//prop typing error remember
const initialState: PotlukkEditInputState = {
  potlukkId: 0,
  title: "",
  location: "",
  status: "",
  description: "",
  isPublic: false,
  time: 0,
  tags: []

}
export function PotlukkDetailHost(){
  //const selector = useSelector((store: LukkerUserState) => store.currentPotluck)
  const[pid,setPid] = useState<Potlukk>(JSON.parse(potlukkJson))
  //const[update,setUpdate] = useState<boolean>(false)
  const {potlukk} = useParams()
  const potlukkId = Number(potlukk);
  const sendDispatch = useDispatch()<PotlukkActions>
  const selector = useSelector((store: LukkerUserState) => store.currentPotluck)
  const [FormState, dispatchForm] = useReducer(PotlukkEditFormReducer, initialState)
  //const pot = async () => {await getPotlukkById(potlukkId)}
  //setPid(selector.potlukkId)
  
  useEffect(()=>{ // use effect for rest gets/ constant display
    getPotlukkById(potlukkId)
    .then(pl => setPid(pl))
    .catch(error => {})
    console.log(pid)
    //sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: potlukkId});
    //while(pid !== selector.potlukkId){setPid(selector.potlukkId);console.log(pid)}
    const potluk = {
      potlukkId: pid.potlukkId,
      title: pid.details.title,
      location: pid.details.location,
      status: pid.details.status.toString(),
      description: pid.details.description,
      isPublic: pid.details.isPublic,
      time: pid.details.time,
      tags: pid.details.tags
    }
    dispatchForm({type:"LOAD_EDIT_FORM", payload:potluk})
  },[]);

  //console.log(pid+"   "+potlukkId)
/*
  const potluk = {
    potlukkId: potlukkId,
    title: selector.details.title,
    location: selector.details.location,
    status: selector.details.status.toString(),
    description: selector.details.description,
    isPublic: selector.details.isPublic,
    time: selector.details.time,
    tags: selector.details.tags
  }
  
  dispatchForm({type:"LOAD_EDIT_FORM", payload:potluk})
  */
  /*
  const potluk = {
    potlukkId: selector.potlukkId,
    title: selector.details.title,
    location: selector.details.location,
    status: selector.details.status.toString(),
    description: selector.details.description,
    isPublic: selector.details.isPublic,
    time: selector.details.time,
    tags: selector.details.tags
  }
  
  useEffect(()=>{
    dispatchForm({type:"LOAD_EDIT_FORM", payload:potluk})
  },[])
  */
  
  
  

  /*
  const selector = useSelector((store: LukkerUserState) => store)
  //console.log(selector.currentPotluck)
  const details = selector.currentPotluck.details
  //console.log(details)
  const initialState: PotlukkEditInputState = {
          potlukkId: selector.currentPotluck.potlukkId,
          title: details.title,
          location: details.location,
          status: details.status.toString(),
          description: details.description,
          isPublic: details.isPublic,
          time: details.time,
          tags: details.tags

  }
  */
  
  
  
  
  const alert = useAlert();
  const router = useNavigate();
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