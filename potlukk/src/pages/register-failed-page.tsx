import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PotlukkActions } from "../reducers/potlukk-reducer";



export function RegisterFailed(){

    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()

    function returnToRoot(){
        dispatch({type:"CLEAR_ERROR"})
        router("/")
    }

    return<>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <h1>Oops</h1>
            <h3>Registration failed, plaese try again</h3>
            <button onClick={returnToRoot}>OK</button>
        </div>
    </>
}