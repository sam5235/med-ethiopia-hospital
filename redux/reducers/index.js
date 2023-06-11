import { combineReducers } from "redux"
import counterReducer from "./counter"
import { patients } from "./patients";
const allReducers = combineReducers ({
    counter: counterReducer,
    patientsPage: patients 
})

export default allReducers;

