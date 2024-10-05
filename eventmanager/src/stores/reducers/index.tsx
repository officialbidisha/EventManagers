import { combineReducers } from "redux";
import {eventReducer} from "./eventreducer"


const reducers = combineReducers({
    app: eventReducer,
})

export default reducers;