import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import Events from "./Events";
import type { Event } from "../models/Event";
import { RootState } from "./../stores/reducers/index"; // Adjust the path based on your file structure
import { useAppDispatch } from "../hooks";
import { getEventList } from "../stores/actions/action";
const EventList: React.FC = () => {
  debugger;
  // Get the events list and disabled index from the Redux store
  const list: Event[] = useSelector((state: RootState) => state.app.events);
  const { events} = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const disabledIndex: string[] = useSelector(
    (state: RootState) => state.app.disabledIndex
  );


  // Fetch event list on component mount
  useEffect(() => {
    if (events.length === 0) {
      debugger;
      dispatch(getEventList());
    }
  }, [dispatch, events.length]);


  // Render events if the list is not empty
  return (
    <>
      {list.length > 0 &&
        list.map((listEle) => {
          const {
            event_name,
            event_category,
            id,
            start_time,
            end_time,
          } = listEle;

          return (
            <Events
              key={id}
              id={id}
              event_name={event_name}
              event_category={event_category}
              end_time={end_time}
              start_time={start_time}
              isSelected={false}
              isDisabled={disabledIndex.includes(id)} // Check if id is in the disabled index
            />
          );
        })}
    </>
  );
};

export default EventList;
