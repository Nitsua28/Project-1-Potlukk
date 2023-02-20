import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";
import { NavBar } from "./navbar";

const flexStyle:React.CSSProperties = {
    border:"2px solid black",
    padding:"5px",
    height: "70vh",
    width: "30%",
    display:"flex",
    flexDirection:"column"
}


export function HomePage(){

    const router = useNavigate()

    const currentUserState = useSelector((store:LukkerUserState) => store.currentUser);
    const potlukkList = useSelector((store:LukkerUserState) => store.filteredPotlukkList);
    const notificationList = useSelector((store:LukkerUserState)=>store.filteredNotificationList);
    const dispatch = useDispatch()<PotlukkActions>;
    if(localStorage.getItem("userid") === "0"){
        alert("Please login or signup to access home page")
        router("/")
    }
    
    useEffect(()=>{
        dispatch({type:"REQUEST_POTLUKK_DETAILS"})
    },[])

    //console.log(potlukkList.filter(e=>e.host.userId===Number(localStorage.getItem("userid"))))
    //console.log(potlukkList.filter(e=>e.host.userId===Number(localStorage.getItem("userid")) ||  e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))&&u.status.toString()==="ACCEPTED"))) 
    return <>
        <NavBar/>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center"}}>
            <div style={flexStyle}>
                <h1 style={{borderBottom:"2px solid black"}}>Invited Potlukks</h1>
                <hr />
                {potlukkList.filter(e=>e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))
                &&u.status.toString()==="PENDING" )).map(f=><div style={{borderBottom:"1px solid black", display:"flex", width:"100%",alignItems:"center"}}>{f.details.title}<button style={{display:"block", marginLeft:"auto",marginRight:"10px"}} onClick={()=>router("/guest/"+f.potlukkId)}>Check it Out</button></div>)}
            </div>
            <div style={flexStyle}>
                <h1 style={{borderBottom:"2px solid black"}}>Attending Potlukks</h1>
                <hr />
                {potlukkList.filter(e=>e.host.userId===Number(localStorage.getItem("userid")) 
                ||  e.invitations.some(u=>u.potlukker.userId===Number(localStorage.getItem("userid"))
                &&u.status.toString()==="ACCEPTED")).map(f=><div style={{borderBottom:"1px solid black", display:"flex", width:"100%",alignItems:"center"}}>{f.host.userId===Number(localStorage.getItem("userid")) && "[host]"} {f.details.title}<button style={{display:"block", marginLeft:"auto",marginRight:"10px"}} onClick={()=>router(f.host.userId===Number(localStorage.getItem("userid")) ? "/host/"+f.potlukkId:"/guest/"+f.potlukkId)}>Check it Out</button></div>)}
            </div>
            <div style={flexStyle}>
                <h1 style={{borderBottom:"2px solid black"}}>Notifications</h1>
                <hr />
                {notificationList.map(n => n.createdByUser===Number(localStorage.getItem("userid")) ? <></>:<div style={{borderBottom:"1px solid black", display:"flex", width:"100%",alignItems:"center"}}>{n.description}<button style={{display:"block", marginLeft:"auto",marginRight:"10px"}} onClick={()=>router(potlukkList.filter(p=>p.potlukkId===n.affectedPotlukkId)[0].host.userId===Number(localStorage.getItem("userid")) ? "/host/"+n.affectedPotlukkId:"/guest/"+n.affectedPotlukkId)}>See Details</button></div>)}
            </div>
        </div>
    </>
}

