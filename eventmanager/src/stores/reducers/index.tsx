import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";


const reducers = combineReducers({
    app: eventReducer,
})
export type RootState = ReturnType<typeof reducers>;
export default reducers;