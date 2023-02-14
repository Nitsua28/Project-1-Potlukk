import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PotlukkActions } from "../reducers/potlukk-reducer";


export function RegisterSuccess(){

    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()

    function returnToRoot(){
        dispatch({type:"CLEAR_USER_ADDED"})
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