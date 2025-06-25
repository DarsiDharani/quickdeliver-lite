import React, { useEffect, useState } from "react";
import api from "../api/api";

const statuses = ["Pending", "Accepted", "In-Transit", "Completed"];

const DeliveryList = ({ user }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDeliveries = async () => {
    try {
      let url = `/deliveries?createdBy=${user._id}&status=${selectedStatus}`;
      const res = await api.get(url, { withCredentials: true });
      setDeliveries(res.data);
    } catch (err) {
      console.error("Error fetching deliveries:", err);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [selectedStatus, user._id]);

  const filteredDeliveries = deliveries.filter((delivery) => {
    const search = searchTerm.toLowerCase();
    return (
      delivery.pickupAddress.toLowerCase().includes(search) ||
      delivery.dropoffAddress.toLowerCase().includes(search) ||
      delivery.packageNote?.toLowerCase().includes(search) ||
      delivery._id.toLowerCase().includes(search) ||
      delivery.acceptedBy?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Your Delivery Requests
      </h2>

      <input
        type="text"
        placeholder="Search by address, driver, note, or ID"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredDeliveries.length === 0 ? (
        <div className="bg-white p-4 rounded shadow text-gray-500 text-center">
          No {selectedStatus.toLowerCase()} deliveries found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-white p-5 rounded-lg shadow-md"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Delivery Details</h3>
                  <p>
                    <strong>Pickup:</strong> {delivery.pickupAddress}
                  </p>
                  <p>
                    <strong>Dropoff:</strong> {delivery.dropoffAddress}
                  </p>
                  <p>
                    <strong>Note:</strong> {delivery.packageNote || "None"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        delivery.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : delivery.status === "Accepted"
                          ? "bg-blue-100 text-blue-800"
                          : delivery.status === "In-Transit"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(delivery.createdAt).toLocaleString()}
                  </p>
                </div>

                {delivery.acceptedBy && (
                  <div>
                    <h3 className="font-bold text-lg mb-1">Driver Details</h3>
                    <p>
                      <strong>Name:</strong> {delivery.acceptedBy.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {delivery.acceptedBy.email}
                    </p>
                    <p>
                      <strong>Accepted At:</strong>{" "}
                      {delivery.acceptedAt
                        ? new Date(delivery.acceptedAt).toLocaleString()
                        : "N/A"}
                    </p>
                    {delivery.completedAt && (
                      <p>
                        <strong>Completed At:</strong>{" "}
                        {new Date(delivery.completedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {delivery.itemImage && (
                <div className="mt-4">
                  <p className="font-bold mb-1">Item Image:</p>
                  <img
                    src={`http://localhost:5000/uploads/deliveries/${delivery.itemImage}`}
                    alt="Item"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
