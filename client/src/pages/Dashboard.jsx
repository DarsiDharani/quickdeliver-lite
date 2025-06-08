import { useState } from "react";
import CreateDelivery from "../components/CreateDelivery";
import DeliveryList from "../components/DeliveryList";

export default function Dashboard({ user }) {
  const [refresh, setRefresh] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-70" />
      <div className="relative z-10 w-full max-w-3xl mx-auto p-6 rounded-xl shadow-2xl animate-fade-in">
        <h1 className="text-2xl font-bold mb-2 text-indigo-700 text-center">
          Welcome, {user?.name}!
        </h1>
        <p className="mb-6 text-gray-600 text-center">
          Ready to request your first delivery? Fill out the form below.
        </p>
        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
            {successMsg}
          </div>
        )}
        {user?.role === "customer" && (
          <CreateDelivery
            onCreated={() => {
              setRefresh((r) => !r); // Trigger list refresh
              setSuccessMsg("Delivery request created successfully!");
              setTimeout(() => setSuccessMsg(""), 2500);
            }}
          />
        )}
        <DeliveryList key={refresh} user={user} />
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease;
        }
      `}</style>
    </div>
  );
}
