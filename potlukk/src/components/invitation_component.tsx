import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { InvitationSendInputActions } from "../reducers/invite-reducer";
import { LukkerUserInfo, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";

export function Invitation_Component(){
    const lukkerSelector = useSelector((store: LukkerUserState) => store)
    const [form,setForm] = useState("");
    const sendDispatchPotlukk = useDispatch()<PotlukkActions>
    const sendDispatchInvite = useDispatch()<InvitationSendInputActions>
    let listArray: LukkerUserInfo[] = [];
    (form !== "") ?
    listArray = lukkerSelector.userList.filter((item) => item.username === form ) :
    listArray = lukkerSelector.userList

    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatchPotlukk({type: "REQUEST_GET_USERS", payload: form}); // await since it rreturns a promise
            
        })();
        
      },[]);
      
    return(
    <>
        
        <div className="lukkers-input-container">
            <div className="searchbutton-container">
                {/* <button onClick={()=>()}>search</button> */}
            </div>
            <div className="search-container">
            <input placeholder="username" onChange={(e) =>setForm(e.target.value)} ></input>
            </div>
        </div>
        <div className="invite-container">
            <div className="inviteHeader-container">List of Users</div>
            <div className="inviteResults-container">
                <ul>
                    {/* {listArray.map(
                        (item)=><li key={item.username}>{item.username}{item.fname} {item.lname}
                        <button onClick={() =>sendDispatchInvite({type: "REQUEST_INVITE_BUTTON",
                         payload: item.userId})}>invite</button></li>)} */}
                </ul>
            </div>
        </div>
        <div className="invited-container">
            <div className="invitedHeader-container">Invited Users</div>
            <div className="invitedResults-container"></div>
        </div>

    </>
    );
}