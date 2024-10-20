import { Event } from "../../models/Event";
import { ActionTypes } from "./../action-types/action-types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
// Update Action interface to use the ActionTypes enum
import { RootState } from "../reducers/index";

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
      "https://run.mocky.io/v3/b273405d-0b94-492f-8664-e5e1fb18fec8"
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

export const makeErrorNull = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.REMOVE_ERROR_STATE });
  };
};
