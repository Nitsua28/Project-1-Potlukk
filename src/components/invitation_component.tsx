
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LukkerUserInfo, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";

export function Invitation_Component(){
    const selector = useSelector((store: LukkerUserState) => store)
    
    const [form,setForm] = useState("");
    const sendDispatch = useDispatch()<PotlukkActions>

    let listArray: LukkerUserInfo[] = [];
    (form !== "") ?
    listArray = selector.userList.filter((item) => item.username === form ) :
    listArray = selector.userList

    // let invitedArray: LukkerUserInfo[]= [];
    // invitedArray = invitationSelector.invited;
    

    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatch({type: "REQUEST_GET_USERS", payload: form}); // await since it rreturns a promise
            
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
                    {listArray.map(
                        (item)=><li key={item.username}>{item.username}{item.fname} {item.lname}
                        <button onClick={() =>sendDispatch({type: "INVITE_USER_ACTION",
                         payload: item.userId.toString()})}>invite</button></li>)}
                </ul>
            </div>
        </div>
        <div className="invited-container">
            <div className="invitedHeader-container">Invited Users</div>
            <div className="invitedResults-container">
                <ul>
                {selector.invited.map(
            (item)=><li key={item.username}>{item.username}{item.fname} {item.lname}
            <button onClick={() =>sendDispatch({type: "DELETE_INVITED_ACTION",
            payload: item.userId.toString()})}>delete</button></li>)}
                </ul>
            </div>
        </div>

    </>
    );
}