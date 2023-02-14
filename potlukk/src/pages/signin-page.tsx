import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";

export type SignInForm = {
    username: string
    password: string
}

export function SignIn(){

    const[form,setForm] = useState<SignInForm>({username:"", password:""})
    const userState = useSelector((store:LukkerUserState) => store);
    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()
    if(userState.error){
        dispatch({type:"CLEAR_ERROR"})
        alert("Sign In Failed. Plaese try again.")
    }
    if(userState.currentUser.userId > 0){router('/home')}
    //console.log(userState.error)
    function signIn(){
        dispatch({type:"SIGN_IN_USER",payload:form})
    }

    return <>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div>
                <h1>Sign In</h1>
                <hr />
            </div>
            <div>
                <label htmlFor="userName" style={{display:"block"}}>Username</label>
                <input id="userName" type="text" onChange={(e)=>setForm({...form, username:e.target.value})}/>
            </div>
            <div>
                <label htmlFor="password" style={{display:"block"}}>Password</label>
                <input id="password" type="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
            </div>    
            <div>
                <button onClick={signIn}>Sign In</button>
            </div>
            <div>
                <hr />
                <label htmlFor="signUp" style={{display:"block"}}>New User</label>
                <button id="signUp" onClick={()=>router("/registration")}>Sign Up</button>
            </div>
        </div>
    </>
}
//onChange={e=>dispatchForm({type:"UPDATE_USER_NAME", payload:e.target.value})}