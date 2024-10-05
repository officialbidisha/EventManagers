import { configureStore } from '@reduxjs/toolkit'; // Import from redux toolkit
import reducers from './reducers/index'; // Ensure the path is correct
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: reducers,
  middleware:  (getDefaultMiddleware) =>
        getDefaultMiddleware({
           serializableCheck: false, // Disable serializableCheck for redux-persist
         }).concat(thunk)
})

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store


export { store };
