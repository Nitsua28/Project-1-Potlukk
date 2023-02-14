import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LukkerUserState } from "../reducers/potlukk-reducer";
import { NavBar } from "./navbar";




export function HomePage(){

    const router = useNavigate()
    const currentUserState = useSelector((store:LukkerUserState) => store.currentUser);
    if(currentUserState.userId === 0){
        alert("Please login or signup to access home page")
        router("/")
    }

    return <>
        <NavBar/>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center"}}>
            <div>
                <h1>Invited Potlukks</h1>
            </div>
            <div>
                <h1>Attending Potlukks</h1>
            </div>
            <div>
                <h1>Notifications</h1>
            </div>
        </div>
    </>
}

