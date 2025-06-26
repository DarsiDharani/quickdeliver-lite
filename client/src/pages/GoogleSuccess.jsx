import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GoogleSuccess({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://quickdeliver-lite.onrender.com/api/auth/me", {
          withCredentials: true,
        });

        const user = res.data.user;
        if (!user) throw new Error("No user returned");

        setUser(user);

        if (user.role === "customer") {
          navigate("/customer-dashboard");
        } else if (user.role === "driver") {
          navigate("/driver-dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      } catch (error) {
        console.error("Google Login failed:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-xl font-semibold text-gray-700">
        Logging you in with Google...
      </p>
    </div>
  );
}
