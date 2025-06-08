import { useEffect, useState } from "react";
import { getPendingDeliveries, claimDelivery } from "../api/deliveries";
import { toast } from "react-toastify";

export default function DeliveryList({ user }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = () => {
    setLoading(true);
    getPendingDeliveries()
      .then((data) => {
        setDeliveries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleClaim = async (deliveryId) => {
    try {
      await claimDelivery(deliveryId);
      toast.success("Delivery claimed successfully!");
      fetchDeliveries();
    } catch (err) {
      toast.error("Failed to claim delivery.");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!deliveries.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        </svg>
        <p className="text-gray-500">No delivery requests available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-4">
      {deliveries.map((delivery) => (
        <div key={delivery._id} className="bg-white bg-opacity-90 rounded-lg shadow p-4">
          <p className="mb-2 font-semibold text-gray-700">
            {delivery.pickupAddress} &rarr; {delivery.dropoffAddress}
          </p>
          <p className="text-sm text-gray-600">
            Package: {delivery.packageNote}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Requested {new Date(delivery.createdAt).toLocaleString()}
          </p>
          {user?.role === "driver" && (
            <button
              className="mt-3 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
              onClick={() => handleClaim(delivery._id)}
            >
              Claim Delivery
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
