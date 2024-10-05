import React from "react";
import { useSelector } from "react-redux";
import Events from "./Events";
import { RootState } from "../stores/reducers/index"; // Adjust the path based on your file structure
import { Event } from "../models/Event";

const SelectEventList: React.FC = () => {
  // Get the list of selected events from the Redux store
  const list: Event[] = useSelector((state: RootState) => state.app.selectedEvents);

  return (
    <>
      {list.length > 0 ? (
        list.map((ele) => (
          <Events
            key={ele.id}
            id={ele.id}
            event_name={ele.event_name}
            event_category={ele.event_category}
            end_time={ele.end_time}
            start_time={ele.start_time}
            isSelected={true}
          />
        ))
      ) : (
        <p className="select-list">Selected events..</p>
      )}
    </>
  );
};

export default SelectEventList;
