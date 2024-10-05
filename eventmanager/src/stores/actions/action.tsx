import { Event } from "../../models/Event";
import { ActionTypes } from "./../action-types/action-types";
import { Dispatch } from "redux";
// Update Action interface to use the ActionTypes enum


interface ErrorPayload {
  message: string;
  payload?: any;
}

export type Action =
  | { type: ActionTypes.GET_EVENTLIST; payload: Event[] }
  | { type: ActionTypes.ADD_ERROR; payload: ErrorPayload }
  | { type: ActionTypes.REMOVE_ERROR_STATE }
  | { type: ActionTypes.SELECT_EVENT; payload: Event }
  | { type: ActionTypes.REMOVE_SELECTED_EVENT; payload: Event }
  | { type: ActionTypes.MAKE_EVENT_UNSELECTABLE; payload: Event };

export const getEventList = () => async (dispatch: Dispatch<Action>) => {
  let response;
  try {
    let eventList = await fetch(
      "https://run.mocky.io/v3/9e564653-bf83-4fb8-a223-28075130ff9c"
    );
    response = await eventList.json();
    dispatch({ type: ActionTypes.GET_EVENTLIST, payload: response });
  } catch (err) {
    const errorPayload: ErrorPayload = {
      message: err instanceof Error ? err.message : "Unknown error occurred",
    };
    dispatch({ type: ActionTypes.ADD_ERROR, payload: errorPayload });
  }
};

export const selectEvent =
  (eventDetails: Event) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.SELECT_EVENT, payload: eventDetails });
  };

export const removeSelectedEvent =
  (eventDetails: Event) => (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.REMOVE_SELECTED_EVENT,
      payload: eventDetails,
    });
  };

export const makeErrorNull = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionTypes.REMOVE_ERROR_STATE });
};
