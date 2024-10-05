import "./App.css";
import { useSelector } from "react-redux";
import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getEventList } from "./stores/actions/action";
import Loader from "./components/Loader";
import { RootState } from "./stores/reducers/index"; 
import { useAppDispatch } from "./hooks";
import ProtectedRoute from "./components/ProtectedRoute"; 
import EventsPage from "./components/EventsPage";
import { makeErrorNull } from "./stores/actions/action";
import { ToastProvider, useToast } from "./components/ToastManager"; // Adjusted imports
import Modal from "./components/Modal";

const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));

function App() {
  const { error, events } = useSelector((state: RootState) => state.app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Fetch event list on component mount
  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEventList());
    }
  }, [dispatch, events.length]);

  return (
    <ToastProvider>
      <MainComponent error={error}  isModalOpen = {isModalOpen} setIsModalOpen={setIsModalOpen} />
    </ToastProvider>
  );
}
interface MainComponentProps {
  error: { message?: string | undefined} | null; // Adjust based on your error structure
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const MainComponent: React.FC<MainComponentProps> = ({ error, isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast(); // Moved this inside the MainComponent
  useEffect(() => {
    // Only show toast if there's an error message and it's not empty
    if (error?.message) { 
      showToast(error.message||'', 'error');
      setIsModalOpen(true); // Open the modal for user confirmation
    }
  }, [error]); // Ensure showToast and setIsModalOpen are dependencies

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    dispatch(makeErrorNull()); // Clear the error state
  };


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
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <p>Do you want to clear the error?</p>
          <button onClick={handleCloseModal}>Yes</button>
          <button onClick={() => setIsModalOpen(false)}>No</button>
        </Modal>
      </div>
    </Router>
  );
};

export default App;
