import {ActionTypes} from "../action-types/action-types";
import { returnTime, isConflictPresent } from "../../utils/conflictCalulator";
import type { Event } from "../../models/Event";
// Define types for event and payload structures

interface Payload {
  startTime: string; // Use appropriate date/time type
  endTime: string; // Use appropriate date/time type
}

interface State {
  events: Event[];
  selectedEvents: Event[];
  disabledIndex: string[]; // Assuming IDs are strings
  error: { message?: string } | null;
}

export interface EventState {
  events: Event[];
  selectedEvents: Event[];
  disabledIndex: string[];
  error: null | { message: string };
}


const initialState: State = {
  events: [],
  selectedEvents: [],
  disabledIndex: [],
  error: null,
};

const getConflictingEvents = (events: Event[], payload: Payload): string[] => {
  const conflictingIds: string[] = [];

  for (let i = 0; i < events.length; i++) {
    const l1 = returnTime(events[i].startTime);
    const l2 = returnTime(payload.startTime);
    const r1 = returnTime(events[i].endTime);
    const r2 = returnTime(payload.endTime);

    if (
      isConflictPresent(l1, l2, r1, r2) &&
      !conflictingIds.includes(events[i].id)
    ) {
      conflictingIds.push(events[i].id);
    }
  }

  return conflictingIds;
};

const removeConflictingEvents = (
  currentDisabledIndexes: string[],
  events: Event[],
  payload: Payload
): string[] => {
  let conflictingIds = [...currentDisabledIndexes];

  for (let i = 0; i < events.length; i++) {
    const l1 = returnTime(events[i].startTime);
    const l2 = returnTime(payload.startTime);
    const r1 = returnTime(events[i].endTime);
    const r2 = returnTime(payload.endTime);

    if (isConflictPresent(l1, l2, r1, r2)) {
      conflictingIds = conflictingIds.filter((item) => item !== events[i].id);
    }
  }

  return conflictingIds;
};

// Define action types
interface Action {
  type: string;
  payload: any; // Replace 'any' with the appropriate type for your action payload
}

export const eventReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionTypes.GET_EVENTLIST:
      return {
        ...state,
        events: [...action.payload],
        error: null,
        disabledIndex: [],
      };
    case ActionTypes.SELECT_EVENT:
      if (state.selectedEvents && state.selectedEvents.length <= 2) {
        const currentDisabledIndexes = getConflictingEvents(
          state.events.filter((x) => x.id !== action.payload.id),
          action.payload
        );

        return {
          ...state,
          selectedEvents: [...state.selectedEvents, action.payload],
          events: state.events.filter((x) => x.id !== action.payload.id),
          error: null,
          disabledIndex: [...state.disabledIndex, ...currentDisabledIndexes],
        };
      } else {
        return {
          ...state,
          error: { message: "Cannot select more than 3 events" },
        };
      }
    case ActionTypes.REMOVE_SELECTED_EVENT:
      const updatedDisabledIndexes = removeConflictingEvents(
        state.disabledIndex,
        state.events,
        action.payload
      );

      return {
        ...state,
        selectedEvents: state.selectedEvents.filter(
          (x) => x.id !== action.payload.id
        ),
        events: [...state.events, action.payload],
        error: null,
        disabledIndex: updatedDisabledIndexes,
      };
    case ActionTypes.ADD_ERROR:
      return {
        ...state,
        error: { message: action.payload.error },
      };
    case ActionTypes.REMOVE_ERROR_STATE:
      return {
        ...state,
        error: null,
      };
    default: {
      return state;
    }
  }
};
