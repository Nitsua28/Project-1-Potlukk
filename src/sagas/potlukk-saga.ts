import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createUser, getAllUsers, createPotlukk, verifyUser, getUserById, sendInvite, editPotlukk, getPotlukkById, getPotlukkuserDetails, swapDishes, addNotification } from "../api/potlukk-requests";
import { CreateUserAction, LukkerUserInfo, Potlukk, RequestCreatePotlukk,
     RequestGetUsersAction, SignInUser, RequestUserById, RequestEditPotlukk, InvitationSendInput, RequestPotlukkDetailsAction, RequestGetPotlukkById, SetCurrentPotlukk, PotlukkNotification, RequestCreateNotification, PotlukkNotificationInput, NotificationKind  } from "../reducers/potlukk-reducer";



//worker sagas
export function* createUserData(action:CreateUserAction){
    try{
        const newLukker: LukkerUserInfo  = yield createUser(action.payload);
        yield put({type:"ADD_USER",payload: newLukker});
    }catch(e){
        yield put({type:"ERROR", payload:true});
    }
    
}

export function* signInUser(action:SignInUser){
    try{
        const currentLukker:LukkerUserInfo = yield verifyUser(action.payload);
        //console.log(currentLukker)
        if(Object.hasOwn(currentLukker, 'detail')){
            throw new Error
        }else{
            yield put({type:"SET_USER", payload: currentLukker});
        }
    }catch(e){
        yield put({type:"ERROR", payload:true});

    }
}

export function* getUsers(action: RequestGetUsersAction){
    try{
        const lukkers: LukkerUserInfo[]  = yield getAllUsers();
        yield put({type:"GET_USERS",payload: lukkers});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

export function* getUserByIdFormInvite(action: RequestUserById){
    try{
        const lukker: LukkerUserInfo  = yield getUserById(action.payload);
        yield put({type:"INVITE_BUTTON",payload: lukker});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

export function* createNewNotification(action:RequestCreateNotification){
    try{
        const notification:PotlukkNotification = yield addNotification(action.payload);
        yield put({type:"SET_NOTIFICATION",payload:notification})
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

export function* createPotlukkByForm(action: RequestCreatePotlukk){

    try{
        
        const potlukk: Potlukk  = yield createPotlukk(action.payload);
        const invited: LukkerUserInfo[] = yield select(store => store.invited)

        yield invited.forEach((item)=>  {
            sendInvite(
            {
            potlukkId: potlukk.potlukkId,
            potlukkerId: item.userId
        })})
        const notified:PotlukkNotification = yield addNotification({
            affectedPotlukkId:potlukk.potlukkId,
            createdByUser:potlukk.host.userId,
            description:potlukk.details.description,
            kind: "INVITE_SENT"
        });
        yield put({type:"SET_NOTIFICATION",payload:notified})
        yield put({type:"CLEAR_INVITED"});
        yield put({type:"ADD_POTLUKK",payload: potlukk});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true});
    }
}

export function* editPotlukkByForm(action: RequestEditPotlukk){

    try{
        
        const potlukk: Potlukk  = yield editPotlukk(action.payload);
        const alreadyInvitedIds = potlukk.invitations.map((item) => item.potlukker.userId)
        const invited: LukkerUserInfo[] = yield select(store => store.invited)
        // const invited: LukkerUserInfo[] = yield select(store => store.invited)

        yield invited.forEach((item)=>  {
            (!(alreadyInvitedIds.some((invitedItem) => invitedItem === item.userId))) &&
            sendInvite(
            {
                potlukkId: potlukk.potlukkId,
                potlukkerId: item.userId
            }
        )
        })
        
        const notified:PotlukkNotification = yield addNotification({
            affectedPotlukkId:potlukk.potlukkId,
            createdByUser:potlukk.host.userId,
            description:potlukk.details.description,
            kind: "POTLUKK_ALTERED"
        });
        yield put({type:"SET_NOTIFICATION",payload:notified})

    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}
// export function* swapDishesByForm(action: RequestSwapDishes){

//     try{
        
//         const potlukk: Potlukk  = yield swapDishes(action.payload);
        
        
//     }catch(e){
//         yield put({type:"ERROR", payload: e, error:true
//         });
//     }
// }
export function* cancelPotlukk(action: RequestEditPotlukk){

    try{
        action.payload.status = "CANCELLED";
        const potlukk: Potlukk  = yield editPotlukk(action.payload);
        const notified:PotlukkNotification = yield addNotification({
            affectedPotlukkId:potlukk.potlukkId,
            createdByUser:potlukk.host.userId,
            description:potlukk.details.description,
            kind: "POTLUKK_CANCELED"
        });
        yield put({type:"SET_NOTIFICATION",payload:notified})
        
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

export function* getPotlukkByIdForm(action: RequestGetPotlukkById){

    try{
        
        const potlukk: Potlukk  = yield getPotlukkById(action.payload);
        yield put({type:"SET_CURRENT_POTLUKK", payload: potlukk});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}
// export function* inviteLukker(action: RequestInviteButtonAction){
//     try{
        
//         // const potlukk: Potlukk  = yield sendInvite();
//         // yield put({type:"ADD_POTLUKK",payload: });
//     }catch(e){
//         yield put({type:"ERROR", payload: e, error:true
//         });

//     }
// }

export function* getPotlukkDetails(action:RequestPotlukkDetailsAction){
    try{
        const lukkers: Potlukk[]  = yield getPotlukkuserDetails();
        yield put({type:"GET_POTLUKK_DETAILS",payload: lukkers});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

//watcher sagas
export function* watchCreateNotification(){
    yield takeEvery("REQUEST_CREATE_NOTIFICATION",createNewNotification)
}

export function* watchGetPotlukkDetails(){
    yield takeEvery("REQUEST_POTLUKK_DETAILS",getPotlukkDetails)
}

export function* watchCreateUserData(){
    yield takeEvery("CREATE_USER", createUserData)
}

export function* watchSignInUser(){
    yield takeEvery("SIGN_IN_USER", signInUser)
}

export function* watchGetUsers(){
    yield takeEvery("REQUEST_GET_USERS", getUsers)
}

export function* watchCreatePotlukk(){
    yield takeEvery("REQUEST_CREATE_POTLUKK", createPotlukkByForm)
}

export function* watchGetUserByIdInvite(){
    yield takeEvery("REQUEST_USER_BY_ID", getUserByIdFormInvite)
}

export function* watcheditPotlukkByForm(){
    yield takeEvery("REQUEST_EDIT_POTLUKK", editPotlukkByForm)
}
export function* watchGetPotlukkById(){
    yield takeEvery("REQUEST_GET_POTLUKK_BY_ID", getPotlukkByIdForm)
}
export function* watchCancelPotlukk(){
    yield takeEvery("REQUEST_CANCEL_POTLUKK", cancelPotlukk)
}
//root saga
export function* rootSaga(){

    yield all([watchCreateUserData(), watchGetUsers(),
         watchCreatePotlukk(), watchSignInUser(),
         watchGetUserByIdInvite(), watcheditPotlukkByForm(),
         watchGetPotlukkById(), watchGetPotlukkDetails(),
         watchCancelPotlukk(), watchCreateNotification()]) // an array of watcher sagas

}

