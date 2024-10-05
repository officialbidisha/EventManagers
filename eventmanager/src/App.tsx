import "./App.css";
import { useSelector } from "react-redux";
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getEventList } from "./stores/actions/action";
import Loader from "./components/Loader";
import { RootState } from "./stores/reducers/index"; 
import { useAppDispatch } from "./hooks";
import ProtectedRoute from "./components/ProtectedRoute"; 
import EventsPage from "./components/EventsPage";
import { makeErrorNull } from "./stores/actions/action";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

function App() {
  const { error, events } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEventList());
    }
  }, [dispatch, events.length]);

  useEffect(() => {
    if (error) {
      alert(error.message);
      const userConfirmed = window.confirm("Do you want to clear the error?");
      if (userConfirmed) {
        dispatch(makeErrorNull());
      }
    }
  }, [error, dispatch]);

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected route */}
            <Route path="/events" element={<ProtectedRoute component={EventsPage} />} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
