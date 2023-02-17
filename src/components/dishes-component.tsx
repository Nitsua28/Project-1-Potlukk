import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DishEditPage } from "../pages/dish-edit-page";
import { LukkerUserState, Potlukk, PotlukkActions } from "../reducers/potlukk-reducer";

export function Dishes_Component(props:{number:number}){

    const selector = useSelector((store: LukkerUserState) => store)
    const sendDispatch = useDispatch()<PotlukkActions>
    const router = useNavigate();
    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: props.number}); // await since it rreturns a promise
            
        })();
        
      },[]);


    return (
        <>
          <div>
                <ul>
                    {selector.currentPotluck.dishes.map(
                    (item) => <li key={item.name}> {item.name} {(selector.currentPotluck.host.userId.toString() === (localStorage.getItem("userid"))&&<Link to={"/dishedit/" + props.number+ "/"+ item.name}>edit</Link>)}</li>
                    )}
                </ul>
          </div>
        </>
    );
}