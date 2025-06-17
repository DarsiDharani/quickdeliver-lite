import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import api from "./api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading while checking auth

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user); 
      } catch (err) {
        console.log("❌ Not logged in");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  // Show loading until auth check is done
  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route 
              path="/profile" 
              element={
                <Profile 
                  user={user} 
                  onLogout={handleLogout} 
                />
              } 
            />
          {/* Protected dashboard logic */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                {user?.role === "driver" ? (
                  <DriverDashboard user={user} />
                ) : (
                  <CustomerDashboard user={user} />
                )}
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}
