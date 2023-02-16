import { Dishes, PotlukkActions } from "../reducers/potlukk-reducer";
import { useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { DishFormReducer, DishFormState } from "../reducers/dish-form-reducer";
export function DishEditPage(){
    const {potlukkId,dishname} = useParams();
    const userid = localStorage.getItem("userid");
    const sendDispatch = useDispatch()<PotlukkActions>
    const initialState: DishFormState = {
            name: "",
            description: "",
            broughtBy: Number(userid),
            serves: 0,
            allergens: []
    }
    
    const [FormState, dispatchForm] = useReducer(DishFormReducer, initialState);
    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: Number(potlukkId)}); // await since it rreturns a promise
            
        })();
        
      },[]);
    return(
        <>
            <div>
                <div>
                    <label>Name</label>
                    <input onChange={()=> dispatchForm({type: "UPDATE_NAME",payload: FormState.name})}></input>
                    <label>Description</label>
                    <input onChange={()=> dispatchForm({type: "UPDATE_DESCRIPTION",payload: FormState.description})}></input>
                    <label>Serves</label>
                    <input onChange={()=> dispatchForm({type: "UPDATE_SERVES",payload: FormState.serves})}></input>
                    <button>Delete</button>
                </div>
                <div>
                    <h1>Allergens</h1>
                    <div>
                        <ul>
                            <li>
                                <label>MILK</label>
                                {/* <input type="checkbox" onChange={(e)=>dispa}></input> */}
                            </li>
                            <li>
                                <label>EGG</label>
                                <input type="checkbox"></input>
                            </li>
                            <li>
                                <label>FISH</label>
                                <input type="checkbox"></input>
                            </li>
                            <li>
                                <label>SHELLFISH</label>
                                <input type="checkbox"></input>
                            </li>
                            <li>
                                <label>SOY</label>
                                <input type="checkbox"></input>
                            </li>
                            <li>
                                <label>WHEAT</label>
                                <input type="checkbox"></input>
                            </li>
                            <li>
                                <label>TREENUT</label>
                                <input type="checkbox"></input>
                            </li>
                        </ul>
                    </div>
                    <button>update</button>
                </div>
            </div>
        </>
    );
}