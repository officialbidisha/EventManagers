import "./App.css";
import {useSelector } from "react-redux";
import React, { useEffect, Suspense } from "react";
import { getEventList, makeErrorNull } from "./stores/actions/action";
import { RootState } from "./stores/reducers/index"; // Ensure this path is correct
import Loader from "./components/Loader";
import { store } from "./stores/index";
import { useAppDispatch } from "./hooks";

const SelectedEventsList = React.lazy(() => import('./components/SelectedEventsList'));
const EventList = React.lazy(() => import("./components/EventList"));

function App() {
  const { error, events } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (store && events.length <= 0) {
      dispatch(getEventList());
    }
  }, [dispatch, events.length]);

  // useEffect(() => {
  //   if (error) {
  //     alert(error.message);
  //     // Display confirmation dialog to the user
  //     const userConfirmed = window.confirm("Do you want to clear the error?");
  //     if (userConfirmed) {
  //       console.log('Confirm');
  //       dispatch(makeErrorNull());
  //     }
  //   }
  // }, [error, dispatch]);
  

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <div className="row border">
          <div className="flex-column style2">
            <p className="event-header">All Events</p>
            <div className="flex-condition">
              <EventList />
            </div>
          </div>
          <div className="flex-column style2">
            <p className="event-header">Selected Events</p>
            <div className="flex-condition">
              <SelectedEventsList />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
