import { ActionTypes } from "./../action-types/action-types";
import { Dispatch } from "redux";

// Update Action interface to use the ActionTypes enum
interface EventDetails {
  id: string;
  name: string;
  event_category: string;
  startTime: string;
  endTime: string;
}

interface ErrorPayload {
  message: string;
  payload?: any;
}

export type Action =
  | { type: ActionTypes.GET_EVENTLIST; payload: EventDetails[] }
  | { type: ActionTypes.ADD_ERROR; payload: ErrorPayload }
  | { type: ActionTypes.REMOVE_ERROR_STATE }
  | { type: ActionTypes.SELECT_EVENT; payload: EventDetails }
  | { type: ActionTypes.REMOVE_SELECTED_EVENT; payload: EventDetails }
  | { type: ActionTypes.MAKE_EVENT_UNSELECTABLE; payload: EventDetails };
