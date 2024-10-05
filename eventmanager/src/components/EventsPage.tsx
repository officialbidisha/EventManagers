import React, { Suspense } from "react";
import Loader from "./Loader";
const SelectedEventsList = React.lazy(() => import("./SelectedEventsList"));
const EventList = React.lazy(() => import("./EventList"));

const EventsPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="row border">
        {/* All Events Section */}
        <div className="flex-column style2">
          <p className="event-header">All Events</p>
          <div className="flex-condition">
            <EventList />
          </div>
        </div>

        {/* Selected Events Section */}
        <div className="flex-column style2">
          <p className="event-header">Selected Events</p>
          <div className="flex-condition">
            <SelectedEventsList />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default EventsPage;
