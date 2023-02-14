
import { useState, useReducer, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PotlukkFormReducer } from "../reducers/potluck-form-reducer"
import { PotlukkActions ,LukkerUserState, PotlukkStatus, LukkerUserInfo } from "../reducers/potlukk-reducer"
import { PotlukkCreationInputState } from "../reducers/potluck-form-reducer";
import Calendar from 'react-calendar'
import "../stylesheets/style.css"
import 'react-calendar/dist/Calendar.css';
export function Hostpage(){
    
    const selector = useSelector((store: LukkerUserState) => store)
    const initialState: PotlukkCreationInputState = {
        details: {
            title: "",
            location: "",
            status: "SCHEDULED",
            description: "",
            isPublic: false,
            time: "",
            tags: []
        },
        hostId: 78617//selector.currentUser.userId

    }
    
    const [FormState, dispatchForm] = useReducer(PotlukkFormReducer, initialState)


    const sendDispatch = useDispatch()<PotlukkActions>
    const [tagInput, setTagInput]= useState("")
    const [form,setForm] = useState("");
    let tempArray: LukkerUserInfo[] = [];
    (form !== "") ?
    tempArray = selector.userList.filter((item) => item.username === form ) :
    tempArray = selector.userList
    // function filterUsers(){
    //     tempArray = selector.userList.filter((item) => item.username === form)
    // }
    
    
    useEffect(()=>{ // use effect for rest gets/ constant display
      
        (async ()=>{
            
            await sendDispatch({type: "REQUEST_GET_USERS", payload: form}); // await since it rreturns a promise
            
        })();
        
      },[]);

    return(
        <>
            <div className="container">
                <div className="calendar-container">
                    <div className="date-input-container">
                        <div className="date-header-container">
                            TIME/DATE
                        </div>
                        <div className="date-inputbox-container">
                            {FormState.details.time}
                        </div>
                    </div>
                    <div className="calendar-box-container">
                        <Calendar onChange={(value: any,event: any) => dispatchForm({type: "UPDATE_TIME",payload: value.toString()})}/>
                    </div>
                </div>
                <div className="meta-info-container">
                    <div className="title-input-container">
                        <input placeholder="title" onChange={(e)=>dispatchForm({type:"UPDATE_TITLE", payload: e.target.value})}></input>
                    </div>
                    <div className="location-input-container">
                        <input placeholder="location" onChange={(e)=>dispatchForm({type:"UPDATE_LOCATION", payload: e.target.value})}></input>
                    </div>
                    <div className="description-input-container">
                        <input placeholder="description" onChange={(e)=>dispatchForm({type:"UPDATE_DESCRIPTION", payload: e.target.value})}></input>
                    </div>
                    <div className="isPublic-container">
                        <input placeholder="public" type="checkbox" onChange={() =>FormState.details.isPublic ? dispatchForm({type:"UPDATE_ISPUBLIC", payload: false}) : dispatchForm({type:"UPDATE_ISPUBLIC", payload: true})}></input>
                    </div>
                    <div className="tags-container">
                        <div className="tags-input-container">
                            <input placeholder="tags" onChange={(e)=> setTagInput(e.target.value)}></input>
                        </div>
                        <div className="tagsbutton-container">
                            <button onClick={(e)=>dispatchForm({type:"ADD_TAG", payload: tagInput})}>add tag</button>
                        </div>
                        <div className="tagsshow-container">
                            <div>{FormState.details.tags}</div>
                        </div>
                    </div>
                    <div className="createbutton-container">
                        <button onClick={() => sendDispatch({type: "REQUEST_CREATE_POTLUKK", payload: FormState})}>CREATE</button>
                    </div>
                </div>
                <div className="invite-lukkers-container">
                    <div className="lukkers-input-container">
                        <div className="searchbutton-container">
                            {/* <button onClick={()=>()}>search</button> */}
                        </div>
                        <div className="search-container">
                        <input placeholder="username" onChange={(e) =>setForm(e.target.value)} ></input>
                        </div>
                    </div>
                    <div className="invite-container">
                        <div className="inviteHeader-container">List of Users</div>
                        <div className="inviteResults-container">
                            <ul>
                                {tempArray.map((item)=><li key={item.username}>{item.username}{item.fname} {item.lname}<button>invite</button></li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="invited-container">
                        <div className="invitedHeader-container">Invited Users</div>
                        <div className="invitedResults-container"></div>
                    </div>
                </div>
            </div>
        </>
    )
}