import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";
import { NavBar } from "./navbar";




export function HomePage(){

    const router = useNavigate()

    const currentUserState = useSelector((store:LukkerUserState) => store.currentUser);
    const potlukkList = useSelector((store:LukkerUserState) => store.filteredPotlukkList)
    const dispatch = useDispatch()<PotlukkActions>;
    if(localStorage.getItem("userid") === "0"){
        alert("Please login or signup to access home page")
        router("/")
    }
    
    useEffect(()=>{
        dispatch({type:"REQUEST_POTLUKK_DETAILS"})
    },[])

    //console.log(potlukkList)
    //console.log(potlukkList.filter(e=>e.host.userId===Number(localStorage.getItem("userid")) ||  e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))&&u.status.toString()==="ACCEPTED"))) 
    return <>
        <NavBar/>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center"}}>
            <div>
                <h1>Invited Potlukks</h1>
                {potlukkList.filter(e=>e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))
                &&u.status.toString()==="PENDING" )).map(f=><button onClick={()=>router("/guest/"+f.potlukkId)}>{f.potlukkId}</button>)}
            </div>
            <div>
                <h1>Attending Potlukks</h1>
                {potlukkList.filter(e=>e.host.userId===Number(localStorage.getItem("userid")) 
                ||  e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))
                &&u.status.toString()==="ACCEPTED")).map(f=><button onClick={()=>router(f.host.userId===Number(localStorage.getItem("userid")) ? "/host/"+f.potlukkId:"/guest/"+f.potlukkId)}>{f.potlukkId}</button>)}
            </div>
            <div>
                <h1>Notifications</h1>
            </div>
        </div>
    </>
}

