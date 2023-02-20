import { Dishes, PotlukkActions, Allergen, LukkerUserState, DishesSwapInput, PotlukkNotificationInput } from "../reducers/potlukk-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DishFormReducer, DishFormState } from "../reducers/dish-form-reducer";

export function DishCreatePage(){

    const {potlukkid} = useParams();
    const potlukkId = Number(potlukkid);
   
    const userid = Number(localStorage.getItem("userid"));
    const router = useNavigate();
    const sendDispatch = useDispatch()<PotlukkActions>
    const currentPotluck = useSelector((store: LukkerUserState) => store.currentPotluck)
    const dishes = currentPotluck.dishes
    const hostOfPotluck = currentPotluck.host.userId
    const initialState: DishFormState = {
            name: "",
            description: "",
            broughtBy: userid,
            serves: 0,
            allergens: []
    }
    
    const [FormState, dispatchForm] = useReducer(DishFormReducer, initialState);

    
    function makeForm(){
        const checkDuplicate = dishes.filter((item)=>(item.broughtBy === userid)).filter((item)=>(item.name === FormState.name))
        if (FormState.name !== "" && checkDuplicate.length === 0){
            dishes.push(FormState);
            
            const form: DishesSwapInput= {
                potlukkId:Number(potlukkId),
                dishes: dishes
            }
           
            

            sendDispatch({type:"REQUEST_SWAP_DISHES", payload:form})
            const notified:PotlukkNotificationInput = {
                affectedPotlukkId:Number(potlukkId),
                createdByUser:userid,
                description:`${FormState.name} has been added to ${currentPotluck.details.title} by ${localStorage.getItem("username")}`,
                kind: "DISH_ADDED"
            }
            sendDispatch({type:"REQUEST_CREATE_NOTIFICATION",payload:notified});
            (hostOfPotluck === userid) ?
            router("/host/" + potlukkId.toString()) :
            router("/guest/" + potlukkId.toString())

        }
        else{alert("Field name required or Dish already exists")}
        
    }



    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            await sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: potlukkId}); // await since it rreturns a promise
            
        })();
        
      },[]);
    return(
        <>
            <div>
                <div>
                    <label>Name</label>
                    <input onChange={(e)=> dispatchForm({type: "UPDATE_NAME",payload: e.target.value})}></input>
                    <label>Description</label>
                    <input onChange={(e)=> dispatchForm({type: "UPDATE_DESCRIPTION",payload: e.target.value})}></input>
                    <label>Serves</label>
                    <input onChange={(e)=> dispatchForm({type: "UPDATE_SERVES",payload: Number(e.target.value)})}></input>
                    
                </div>
                <div>
                    <h1>Allergens</h1>
                    <div>
                        <ul>
                            <li>
                                <label>MILK</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "MILK"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "MILK"})
                                    } }></input>
                            </li>
                            <li>
                                <label>EGG</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "EGG"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "EGG"})
                                    } }></input>
                            </li>
                            <li>
                                <label>FISH</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "FISH"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "FISH"})
                                    } }></input>
                            </li>
                            <li>
                                <label>SHELLFISH</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "SHELLFISH"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "SHELLFISH"})
                                    } }></input>
                            </li>
                            <li>
                                <label>SOY</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "SOY"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "SOY"})
                                    } }></input>
                            </li>
                            <li>
                                <label>WHEAT</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "WHEAT"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "WHEAT"})
                                    } }></input>
                            </li>
                            <li>
                                <label>TREENUT</label>
                                <input type="checkbox" onChange={(e)=>{
                                    (e.target.checked) ?
                                    dispatchForm({type:"ADD_ALLERGEN", payload: "TREENUT"}) :
                                    dispatchForm({type:"DELETE_ALLERGEN", payload: "TREENUT"})
                                    } }></input>
                            </li>
                        </ul>
                    </div>
                    <button onClick={()=>makeForm()}>create</button>
                </div>
            </div>
        </>
    );
}