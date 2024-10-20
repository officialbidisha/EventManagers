import "./App.css";
import { useSelector } from "react-redux";
import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getEventList, makeErrorNull } from "./stores/actions/action"; // Adjusted imports
import Loader from "./components/Loader";
import { RootState } from "./stores/reducers/index"; 
import { useAppDispatch } from "./hooks";
import ProtectedRoute from "./components/ProtectedRoute"; 
import EventsPage from "./components/EventsPage";
import { ToastProvider, useToast } from "./components/ToastManager"; // Adjusted imports
import Modal from "./components/Modal";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

function App() {
  const { error, events } = useSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch event list on component mount
  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEventList());
    }
  }, [dispatch, events.length]);

  return (
    <ToastProvider>
      <MainComponent error={error} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </ToastProvider>
  );
}

interface MainComponentProps {
  error: { message?: string } | null; // Adjusted based on your error structure
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const MainComponent: React.FC<MainComponentProps> = ({ error, isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { showToast, hideToast } = useToast(); // Toast methods from context
  const [toastId, setToastId] = useState<number | null>(null); // Keep track of the toast ID

  useEffect(() => {
    // Show toast if there's an error
    if (error?.message) {
      // Hide the existing toast if it's already visible
      if (toastId !== null) {
        hideToast(toastId); // Hide the previous toast
      }

      // Show a new toast for the current error message
      const id = showToast(error.message, 'error');
      setToastId(id); // Update the toast ID

      // Automatically clear the toast after a delay (e.g., 3 seconds)
      setTimeout(() => {
        hideToast(id); // Hide the new toast after the delay
        setToastId(null); // Reset toast ID
        dispatch(makeErrorNull()); // Clear the error state in Redux
      }, 3000); // Change the duration as needed
    }
  }, [error]); // Dependency on error only

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
};

export default App;
