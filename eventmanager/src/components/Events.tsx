import "./Events.css";
import "../styles.css";
import tConvert from "../utils/timeConverter";
import { useDispatch } from "react-redux";
import { removeSelectedEvent, selectEvent } from "./../stores/actions/action";
import { memo } from "react";
interface EventsProps {
  id: string; // Assuming id is a string. Adjust type if necessary.
  name: string;
  category: string;
  startTime: string; // Optional prop
  endTime: string; // Optional prop
  isSelected?: boolean; // Optional prop
  isDisabled?: boolean; // Optional prop
}
const Events: React.FC<EventsProps> = ({
  id,
  name,
  category,
  startTime = "",
  endTime = "",
  isSelected = false,
  isDisabled = false,
}) => {
  const dispatch = useDispatch();
  const firstLetter = category && category.substring(0, 1);
  const starttime = startTime.split(" ")[1];
  const endtime = endTime.split(" ")[1];

  const toggleSelection = () => {
    if (!isSelected) {
      dispatch(selectEvent({ id, name, event_category: category, startTime, endTime }));
    } else {
      dispatch(
        removeSelectedEvent({
          id,
          name,  // Ensure this matches your EventDetails interface
          event_category: category,  // Ensure this matches your EventDetails interface
          startTime,  // Ensure this matches your EventDetails interface
          endTime,  // Ensure this matches your EventDetails interface
        })
      );
    }
  };
  

  return (
    <div className="event-card">
      <div className="caption">{firstLetter}</div>
      <hr className="vertical"></hr>
      <div className="rightrow">
        <div className="name mb-3">{name}</div>
        <div className="category mb-3">{category}</div>
        <div className="time mb-3">
          {tConvert(starttime)}-{tConvert(endtime)}
        </div>
        <button
          className="select-btn float-right"
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
