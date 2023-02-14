
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PotlukkActions, LukkerUserState } from "../reducers/potlukk-reducer";


export function PotlukkDetailHost(){
    const dispatch = useDispatch()<PotlukkActions>
    const selector = useSelector((store: LukkerUserState) => store.userList)
    const [form,setForm] = useState("")
    
    const filteredByUsername = selector.filter((item) => item.username === form)
    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            await dispatch({type: "REQUEST_GET_USERS", payload: form}); // await since it rreturns a promise
            
        })();
    
      },[]);

    return (<>

        <button><Link to="/createPotlukk">Create a Potlukk!</Link></button>
        {/*getting all users*/}
        <h1>get all users to invite to pot luck</h1>
        <input placeholder="username" onChange={(e) =>setForm(e.target.value)} ></input>
    
        <div>{(filteredByUsername.length !== 0)? filteredByUsername.map((item) => item.fname): <></>}</div>
        <div>{(filteredByUsername.length !== 0)? filteredByUsername.map((item) => item.lname): <></>}</div>
        <hr></hr>
        </>
      );
}