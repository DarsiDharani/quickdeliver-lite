import { useState } from "react";
import CreateDelivery from "../components/CreateDelivery";
import DeliveryList from "../components/DeliveryList";
import toast from "react-hot-toast";

export default function Dashboard({ user }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative"
      style={{
        background: "linear-gradient(to right top, #eef2f3, #8ec5fc)", // same as driver
      }}
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto p-6 rounded-xl shadow-2xl animate-fade-in">
        <p className="text-sm text-gray-500 text-center italic mb-1">
          Fast • Reliable • Tracked
        </p>

        <h1 className="text-3xl font-bold mb-2 text-indigo-700 text-center tracking-tight">
          Welcome, {user?.name}!
        </h1>

        <p className="mb-6 text-gray-600 text-center text-sm">
          Quickly create and manage your delivery requests below.
        </p>

        {user?.role === "customer" && (
          <CreateDelivery
            onClose={() => {
              setRefresh((r) => !r);
              toast.success("Delivery request created!");
            }}
          />
        )}

        <DeliveryList key={refresh} user={user} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
