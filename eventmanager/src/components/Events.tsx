import "./Events.css";
import "../styles.css";
import tConvert from "../utils/timeConverter";
import { useAppDispatch } from "../hooks";
import type { Event } from "../models/Event";
import { removeSelectedEvent, selectEvent } from "./../stores/actions/action";
import { memo } from "react";
const Events: React.FC<Event> = ({
  id,
  event_name,
  event_category,
  start_time = "",
  end_time = "",
  isSelected = false,
  isDisabled = false,
}) => {
  debugger;
  const dispatch = useAppDispatch();
  const firstLetter = event_category && event_category.substring(0, 1);
  const starttime = start_time.split(" ")[1];
  const endtime = end_time.split(" ")[1];

  const toggleSelection = () => {
    if (!isSelected) {
      dispatch(selectEvent({ id, event_name, event_category, start_time, end_time }));
    } else {
      dispatch(
        removeSelectedEvent({
          id,
          event_name,  // Ensure this matches your EventDetails interface
          event_category,  // Ensure this matches your EventDetails interface
          start_time,  // Ensure this matches your EventDetails interface
          end_time,  // Ensure this matches your EventDetails interface
        })
      );
    }
  };
  

  return (
    <div className="event-card">
      <div className="caption">{firstLetter}</div>
      <hr className="vertical"></hr>
      <div className="rightrow">
        <div className="name mb-3">{event_name}</div>
        <div className="event_category mb-3">{event_category}</div>
        <div className="time mb-3">
          {tConvert(starttime)}-{tConvert(endtime)}
        </div>
        <button
          className={`select-btn float-right ${isSelected? 'selected': ''}`}
          onClick={toggleSelection}
          disabled={isDisabled ? true : false}
        >
          {!isSelected ? "Select" : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default memo(Events);
