import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createUser } from "../api/potlukk-requests";
import { CreateUserAction, LukkerUserInfo } from "../reducers/potlukk-reducer";


//worker sagas
export function* createUserData(action:CreateUserAction):any{
    try{
        const newLukker: LukkerUserInfo  = yield createUser(action.payload);
        yield put({type:"ADD_USER",payload: newLukker});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
    
}

//watcher sagas
export function* watchCreateUserData(){
    yield takeEvery("CREATE_USER", createUserData)
}

//root saga
export function* rootSaga(){
    yield all([watchCreateUserData()]) // an array of watcher sagas
}