import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";

export function Attendees_Component(props:{number:number}){

    const selector = useSelector((store: LukkerUserState) => store)
    const sendDispatch = useDispatch()<PotlukkActions>
    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: props.number}); // await since it rreturns a promise
            
        })();
        
      },[]);


    return (
        <>
            <h1>Attendees</h1>
          <div>
                <ul>
                    {selector.currentPotluck.invitations.map(
                    (item) => <li key={item.potlukker.userId}> {item.potlukker.username} {(selector.currentPotluck.host.userId.toString() === (localStorage.getItem("userid"))&&item.status)}</li>
                    )}
                </ul>
          </div>
        </>
    );
}