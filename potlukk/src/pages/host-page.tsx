
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotlukkActions, PotlukkCreationInput, LukkerUserState, PotlukkStatus } from "../reducers/potlukk-reducer"


export function Hostpage(){
    
    const selector = useSelector((store: LukkerUserState) => store)

    const initialState: PotlukkCreationInput = {
        details: {
            title: "",
            location: "",
            status: PotlukkStatus.CANCELLED,
            description: "",
            isPublic: false,
            time: 0,
            tags: []
        },
        hostId: selector.currentUser.userId

    }
    const dispatch = useDispatch()<PotlukkActions>
    const [form, setForm] = useState(initialState)
    return(
        <>
            <button onClick={(e) => dispatch({type: "REQUEST_CREATE_POTLUKK", payload: form})}>CREATE</button>
            <input placeholder="title"></input>
            <input placeholder="location"></input>
            <input placeholder="status"></input> 
            <input placeholder="description"></input>
            <input type="checkbox" placeholder=""></input>
            <input placeholder="time"></input>

            <button>tags</button>
            <input placeholder="tags"></input>
            

        </>
    )
}