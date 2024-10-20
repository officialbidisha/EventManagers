import React, { Suspense } from "react";
import Loader from "./Loader";
import "./EventsPage.css";
import { useNavigate } from "react-router-dom";

const SelectedEventsList = React.lazy(() => import("./SelectedEventsList"));
const EventList = React.lazy(() => import("./EventList"));

const EventsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="header">
        <h2>Events</h2>
        <button onClick={handleLogout} className="profile-logout-button">
          <span className="profile-icon">👤</span> {/* Profile icon */}
          Logout
        </button>
      </div>
      <Suspense
        fallback={
          <div className="loader-container">
            <Loader />
          </div>
        }
      >
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
    </>
  );
};

export default EventsPage;
