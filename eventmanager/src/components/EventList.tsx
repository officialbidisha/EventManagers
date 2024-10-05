import React from "react";
import { useSelector } from "react-redux";
import Events from "./Events";
import type { Event } from "../models/Event";
import { RootState } from "./../stores/reducers/index"; // Adjust the path based on your file structure

const EventList: React.FC = () => {
  // Get the events list and disabled index from the Redux store
  const list: Event[] = useSelector((state: RootState) => state.app.events);
  const disabledIndex: string[] = useSelector(
    (state: RootState) => state.app.disabledIndex
  );

  // Render events if the list is not empty
  return (
    <>
      {list.length > 0 &&
        list.map((listEle) => {
          const {
            name,
            category,
            id,
            endTime,
            startTime,
          } = listEle;

          return (
            <Events
              key={id}
              id={id}
              name={name}
              category={category}
              endTime={endTime}
              startTime={startTime}
              isSelected={false}
              isDisabled={disabledIndex.includes(id)} // Check if id is in the disabled index
            />
          );
        })}
    </>
  );
};

export default EventList;
