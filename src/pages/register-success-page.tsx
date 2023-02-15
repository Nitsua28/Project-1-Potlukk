import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";


export function RegisterSuccess(){

    const dispatch = useDispatch()<PotlukkActions>;
    const currentUser = useSelector((store:LukkerUserState) => store.currentUser);
    const router = useNavigate()

    function returnToRoot(){
        dispatch({type:"CLEAR_USER_ADDED"})
        dispatch({type:"SET_USER",payload:currentUser})
        router("/home")
    }

    return<>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <h1>Success</h1>
            <h3>You are registered. Happy Potlukking!!</h3>
            <button onClick={returnToRoot}>Sign In</button>
        </div>
    </>
}