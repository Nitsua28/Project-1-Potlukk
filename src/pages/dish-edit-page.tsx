import { Dishes, PotlukkActions, Allergen, LukkerUserState, DishesSwapInput, PotlukkNotificationInput } from "../reducers/potlukk-reducer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DishFormReducer, DishFormState } from "../reducers/dish-form-reducer";

export function DishEditPage(){

    const {potlukkid,dishname} = useParams();
    const potlukkId = Number(potlukkid);
    const dishName = dishname as string;
    const userid = Number(localStorage.getItem("userid"));
    const router = useNavigate();
    const sendDispatch = useDispatch()<PotlukkActions>
    const dishes = useSelector((store: LukkerUserState) => store.currentPotluck.dishes)

    const initialState: DishFormState = {
            name: dishName,
            description: "",
            broughtBy: userid,
            serves: 0,
            allergens: []
    }
    
    const [FormState, dispatchForm] = useReducer(DishFormReducer, initialState);

    
    function makeForm(){
        const hostDishes = dishes.filter((item)=>(item.broughtBy === userid)).filter((item)=>(item.name !== dishName));
        let resultDishes = dishes.filter((item)=>(item.broughtBy !== userid));
        hostDishes.push(FormState);
        resultDishes.push(...hostDishes)
        const form: DishesSwapInput= {
        potlukkId:Number(potlukkId),
        dishes: resultDishes
        }
        //edit dish
        sendDispatch({type:"REQUEST_SWAP_DISHES", payload:form})
        router("/host/" + potlukkId.toString())
    }

    function deleteForm(){
        const hostDishes = dishes.filter((item)=>(item.broughtBy === userid)).filter((item)=>(item.name !== dishName));
        let resultDishes = dishes.filter((item)=>(item.broughtBy !== userid));
        resultDishes.push(...hostDishes)
        const form: DishesSwapInput= {
        potlukkId:Number(potlukkId),
        dishes: resultDishes
        }
        //cancell dish here
        const notified:PotlukkNotificationInput = {
            affectedPotlukkId:Number(potlukkId),
            createdByUser:userid,
            description:dishName + " has been removed",
            kind: "DISH_REMOVED"
        }
        sendDispatch({type:"REQUEST_CREATE_NOTIFICATION",payload:notified})
        sendDispatch({type:"REQUEST_SWAP_DISHES", payload:form})
        router("/host/" + potlukkId.toString())
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
                    <input value={dishname}></input>
                    <label>Description</label>
                    <input onChange={(e)=> dispatchForm({type: "UPDATE_DESCRIPTION",payload: e.target.value})}></input>
                    <label>Serves</label>
                    <input onChange={(e)=> dispatchForm({type: "UPDATE_SERVES",payload: Number(e.target.value)})}></input>
                    <button onClick={deleteForm}>Delete</button>
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
                    <button onClick={()=>makeForm()}>update</button>
                </div>
            </div>
        </>
    );
}