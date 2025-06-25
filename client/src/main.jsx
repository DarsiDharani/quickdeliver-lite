import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Toast provider
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "text-sm font-medium",
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      />
      <App />
    </>
  </React.StrictMode>
);
