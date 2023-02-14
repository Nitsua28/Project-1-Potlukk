import { useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { formsReducer, jsonInitialState, VerificationForm } from "../reducers/form-reducer";
import { CreateUserForm, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer"

const initialState: VerificationForm = JSON.parse(jsonInitialState)

export function RegisterPage(){

    const [formState, dispatchForm] = useReducer(formsReducer, initialState);
    const userState = useSelector((store:LukkerUserState) => store.userList );
    const dispatch = useDispatch()<PotlukkActions>;

    function registerUser(){
        //make allergy array
        const allergyArray: string[] = [];
        formState.milk.value && allergyArray.push("MILK");
        formState.egg.value && allergyArray.push("EGG");
        formState.fish.value && allergyArray.push("FISH");
        formState.shellfish.value && allergyArray.push("SHELLFISH");
        formState.soy.value && allergyArray.push("SOY");
        formState.wheat.value && allergyArray.push("WHEAT");
        formState.treenut.value && allergyArray.push("TREE_NUT");
        if(!formState.userName.hasError && !formState.password.hasError && !formState.confirmPassword.hasError){
            //make create user form
            const newLukker:CreateUserForm = {
                username: formState.userName.value.toString(),
                password: formState.password.value.toString(),
                fname: "",
                lname: "",
                allergies: allergyArray
            }
            //send form
            dispatch({type:"CREATE_USER", payload:newLukker})
        }else{alert("Form is invalid")}
    }

    return <>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div>
                    <label htmlFor="userName" >Username</label>
                    <input id="userName" type="text" onChange={e=>dispatchForm({type:"UPDATE_USER_NAME", payload:e.target.value})}/>
                    {formState.userName.touched && formState.userName.hasError && <p style={{color:"red"}}>{formState.userName.error}</p>}
                </div> 
                <div>   
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={e=>dispatchForm({type:"UPDATE_PASSWORD", payload:e.target.value})}/>
                    {formState.password.touched && formState.password.hasError && <p style={{color:"red"}}>{formState.password.error}</p>}
                </div>
                <div>    
                    <label htmlFor="confirm">Confirm Passwrod</label>
                    <input id="confirm" type="password" onChange={e=>dispatchForm({type:"UPDATE_VERIFY_PASSWORD", payload:e.target.value})}/>
                    {formState.confirmPassword.touched && formState.confirmPassword.hasError && <p style={{color:"red"}}>{formState.confirmPassword.error}</p>}
                </div>
            </div>
            <div>
                <fieldset>
                    <legend>Allergens</legend>

                    <input id="milk" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_MILK", payload:e.target.checked})}/>
                    <label htmlFor="milk">Milk</label>

                    <input id="egg" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_EGG", payload:e.target.checked})}/>
                    <label htmlFor="egg">Egg</label>

                    <input id="fish" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_FISH", payload:e.target.checked})}/>
                    <label htmlFor="fish">Fish</label>

                    <input id="shellfish" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_SHELLFISH", payload:e.target.checked})}/>
                    <label htmlFor="shellfish">Shellfish</label>

                    <input id="soy" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_SOY", payload:e.target.checked})}/>
                    <label htmlFor="soy">Soy</label>

                    <input id="treeNuts" type="checkbox" onChange={e=>dispatchForm({type:"UPDATE_TREENUT", payload:e.target.checked})}/>
                    <label htmlFor="treeNuts">Tree Nuts</label>
                </fieldset>
                <button onClick={registerUser}>Register</button>
            </div>
        </div>
        
    </>
}