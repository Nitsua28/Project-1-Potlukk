
import { InvitationUpdateInput, LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";
import 'react-calendar/dist/Calendar.css';
import { NavBar } from "./navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert-with-buttons";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotlukkEditFormReducer, PotlukkEditInputState } from "../reducers/potluck-edit-form-reducer";
import { Invitation_Component } from "../components/invitation_component";
import { Attendees_Component } from "../components/attendees_component";
import { Dishes_Component } from "../components/dishes-component";

const MAX:number = 2;
export function PotlukkDetailGuest(){

  const sendDispatch = useDispatch()<PotlukkActions>
  const alert = useAlert();
  const router = useNavigate();
  const {potlukk} = useParams();
  const potlukkId = Number(potlukk);

  const userid = Number(localStorage.getItem("userid"));

  const selector = useSelector((store: LukkerUserState) => store)

  const details = selector.currentPotluck.details;
  let initialStatus = "";
  if (selector.currentPotluck.invitations.length !== 0)
  initialStatus = selector.currentPotluck.invitations.filter((item) => item.potlukker.userId === userid)[0].status;
  
  
  function makeForm(status:string){
    const form :InvitationUpdateInput ={
        potlukkId: potlukkId,
        potlukkerId: userid,
        status: status
    }
    sendDispatch({type: "REQUEST_UPDATE_INVITE", payload: form});
  }
  useEffect(()=>{ // use effect for rest gets/ constant display
        
        sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: potlukkId}); // await since it rreturns a promise
  },[]);


    return (
    <>
      <NavBar/>
      <div>
        <div></div>
        <div className="meta-info-container">
            <div>
                <h1>{details.title}</h1>
                <p>{details.description}</p>
            </div>
            <div>
                <h1>Location</h1>
                <p>{details.location}</p>
            </div>
            <div>
                <h1>Time</h1>
                <p>{new Date(details.time).toString()}</p>
            </div>
            <div>
            <div>{initialStatus}</div>
            <fieldset>
    <legend>Invitation Status</legend>
            
            <div>
                <input type="radio" id="changeToAccepted" name="InviteStatus"onChange={(e)=>((e.target.checked)&& makeForm("ACCEPTED"))}/>
                <label htmlFor="changeToAccepted">Accept</label>
            </div>

            <div>
                <input type="radio" id="changeToMaybe" name="InviteStatus" onChange={(e)=>((e.target.checked)&& makeForm("MAYBE"))}/>
                <label htmlFor="changeToMaybe">Maybe</label>
            </div>

            <div>
                <input type="radio" id="changeToDeclined" name="InviteStatus" onChange={(e)=>((e.target.checked)&& makeForm("DECLINED"))}/>
                <label htmlFor="changeToDeclined">Decline</label>
            </div>
        </fieldset>

            </div>
        </div>
        <div className="dishes-container">
            <Dishes_Component number={potlukkId}/>
        </div>
        <div>
        <Link to={"/dishcreate/" + potlukkId.toString()}>Create</Link>
        </div>
        <div className="attendees-container">
            <Attendees_Component number={potlukkId}/>
        </div>
      </div>
    </>

      );
}