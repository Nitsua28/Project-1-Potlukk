import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createUser, getAllUsers, createPotlukk} from "../api/potlukk-requests";
import { CreateUserAction, LukkerUserInfo, Potlukk, RequestCreatePotlukk, RequestGetUsersAction } from "../reducers/potlukk-reducer";


//worker sagas
export function* createUserData(action:CreateUserAction){
    try{
        const newLukker: LukkerUserInfo  = yield createUser(action.payload);
        yield put({type:"ADD_USER",payload: newLukker});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
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

export function* createPotlukkByForm(action: RequestCreatePotlukk){
    try{
        const potlukk: Potlukk  = yield createPotlukk(action.payload);
        yield put({type:"ADD_POTLUKK",payload: potlukk});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

//watcher sagas
export function* watchCreateUserData(){
    yield takeEvery("CREATE_USER", createUserData)
}

export function* watchGetUsers(){
    yield takeEvery("REQUEST_GET_USERS", getUsers)
}

export function* watchCreatePotlukk(){
    yield takeEvery("REQUEST_CREATE_POTLUKK", createPotlukkByForm)
}

//root saga
export function* rootSaga(){
    yield all([watchCreateUserData(), watchGetUsers(), watchCreatePotlukk()]) // an array of watcher sagas
}