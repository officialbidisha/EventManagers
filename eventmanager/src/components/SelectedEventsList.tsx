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
            name={ele.name}
            category={ele.category}
            endTime={ele.endTime}
            startTime={ele.startTime}
            isSelected={true}
          />
        ))
      ) : (
        <p className="select-list">Select an event!</p>
      )}
    </>
  );
};

export default SelectEventList;
