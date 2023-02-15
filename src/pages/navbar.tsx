import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LukkerUserInfo, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";
import "./navbar-style.css"



export function NavBar(){

    const currentUserState = useSelector((store:LukkerUserState) => store.currentUser);
    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()

    function logOut(){
        const noUser:LukkerUserInfo = {
            userId: 0,
            username:  '',
            fname:     '',
            lname:     '',
            allergies: []
        }
        dispatch({type:"SET_USER", payload:noUser})
        router("/")
    }

    return <>
        <div>
            <ul>
                <li><div><Link to="/home">Home</Link></div></li>
                <li><div><Link to="/registration">Register</Link></div></li>
                <li><div><Link to="/host">Host</Link></div></li>
                <li><div><Link to="/guest">Discover</Link></div></li>
                <li><div><Link to="/">Settings</Link></div></li>
                <li><p>{localStorage.getItem("userid")} {localStorage.getItem("username")}</p></li>
                <li id="logout"><button onClick={logOut}>Log out</button></li>
            </ul>
        </div>
        
    </>

}