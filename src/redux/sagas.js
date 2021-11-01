import { takeLatest , all , put , fork , call } from "redux-saga/effects";
import * as types from "./actionTypes";
import { getRecipes } from "./api";

export function* onLoadRecicpeAsync({  query }){
    try {
        console.log("query" , query);
        const response = yield call (getRecipes , query );
        yield put({ type: types.FETCH_RECIPE_SUCCESS, payload: response.data });
    
    }
    catch (error) {
        yield put({ type: types.FETCH_RECIPE_FAIL , payload: error });
    }
}

export function* onLoadRecicpe() {
    yield takeLatest(types.FETCH_RECIPE_START, onLoadRecicpe);

}


const recipeSaga = [fork(onLoadRecicpe)];

export default function* rootSaga(){
    yield all([...recipeSaga]);
}