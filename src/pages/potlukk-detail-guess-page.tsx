
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";
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

  const details = selector.currentPotluck.details
  const initialStatus = selector.currentPotluck.invitations.filter((item) => item.potlukker.userId === userid);
  const [status,setStatus] = useState()
  

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
                <input type="range" min="0" max={MAX} className="slider" id="myRange">
                </input>
                <p id="rangeValue"></p>
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