import * as actionTypes from "./../action-types/action-types";
import { Dispatch } from "redux";
interface EventDetails {
  id: string; // Adjust the type as necessary
  name: string;
  event_category: string;
  startTime: string;
  endTime: string;
}

interface ErrorPayload {
  message: string;
  payload?:any;
}

type Action =
  | { type: typeof actionTypes.GET_EVENTLIST; payload: any }
  | { type: typeof actionTypes.ADD_ERROR; payload: ErrorPayload }
  | { type: typeof actionTypes.REMOVE_ERROR_STATE }
  | { type: typeof actionTypes.SELECT_EVENT; payload: EventDetails }
  | { type: typeof actionTypes.REMOVE_SELECTED_EVENT; payload: EventDetails }
  | { type: typeof actionTypes.MAKE_EVENT_UNSELECTABLE; payload: EventDetails };

export const getEventList = () => async (dispatch: Dispatch<Action>) => {
  let response;
  try {
    let eventList = await fetch(
      "https://run.mocky.io/v3/9e564653-bf83-4fb8-a223-28075130ff9c"
    );
    response = await eventList.json();
  } catch (err) {
    // Here we check if the error is an instance of Error
    const errorPayload: ErrorPayload = {
        message: err instanceof Error ? err.message : 'An unknown error occurred',
      };
  
      dispatch({
        type: actionTypes.ADD_ERROR,
        payload: errorPayload,
      });
      return;
  }
  dispatch({ type: actionTypes.REMOVE_ERROR_STATE });
  dispatch({
    type: actionTypes.GET_EVENTLIST,
    payload: response,
  });
};

export const selectEvent = (eventDetails: EventDetails) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.SELECT_EVENT, payload: eventDetails });
};

export const removeSelectedEvent = (eventDetails: EventDetails) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.REMOVE_SELECTED_EVENT, payload: eventDetails });
};

export const makeEventUnselectable = (eventDetails: EventDetails) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: actionTypes.MAKE_EVENT_UNSELECTABLE,
    payload: eventDetails,
  });
};

export const makeErrorNull = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: actionTypes.REMOVE_ERROR_STATE });
};

export const throwError = (error: ErrorPayload) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: actionTypes.ADD_ERROR, payload: error });
  };