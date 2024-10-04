// action-types.ts
export const GET_EVENTLIST = "GET_EVENTLIST" as const;
export const SELECT_EVENT = "SELECT_EVENT" as const;
export const REMOVE_SELECTED_EVENT = "REMOVE_SELECTED_EVENT" as const;
export const MAKE_EVENT_UNSELECTABLE = "MAKE_EVENT_UNSELECTABLE" as const;
export const REMOVE_ERROR_STATE = "REMOVE_ERROR_STATE" as const;
export const ADD_ERROR = "ADD_ERROR" as const;

// Create a type for all action types
export type ActionTypes =
  | typeof GET_EVENTLIST
  | typeof SELECT_EVENT
  | typeof REMOVE_SELECTED_EVENT
  | typeof MAKE_EVENT_UNSELECTABLE
  | typeof REMOVE_ERROR_STATE
  | typeof ADD_ERROR;
