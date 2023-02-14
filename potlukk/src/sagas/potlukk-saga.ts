import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createUser, verifyUser } from "../api/potlukk-requests";
import { CreateUserAction, LukkerUserInfo, SignInUser } from "../reducers/potlukk-reducer";


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

//watcher sagas
export function* watchCreateUserData(){
    yield takeEvery("CREATE_USER", createUserData)
}

export function* watchSignInUser(){
    yield takeEvery("SIGN_IN_USER", signInUser)
}

//root saga
export function* rootSaga(){
    yield all([watchCreateUserData(), watchSignInUser()]) // an array of watcher sagas
}