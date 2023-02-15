import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";

export function Attendees_Component(){


 
    const selector = useSelector((store: LukkerUserState) => store)



    return (
        <>
            <h1>Attendees</h1>
          <div>
                <ul>
                    {selector.currentPotluck.invitations.map(
                    (item) => <li key={item.potlukker.userId}> {item.potlukker.username} {item.status}</li>
                    )}
                </ul>
          </div>
        </>
    );
}