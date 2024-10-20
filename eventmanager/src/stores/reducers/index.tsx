import { combineReducers } from "redux";
import { eventReducer } from "./eventreducer";


const reducers = combineReducers({
    app: eventReducer,
})
export type RootState = ReturnType<typeof reducers>;
export default reducers;