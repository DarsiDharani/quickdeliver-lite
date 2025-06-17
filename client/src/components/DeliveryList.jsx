import React, { useEffect, useState } from 'react';
import api from '../api/api';

const statuses = ['Pending', 'Accepted', 'In-Transit', 'Completed'];

const DeliveryList = ({ user }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');

const fetchDeliveries = async () => {
  try {
    let url = `/deliveries?createdBy=${user._id}`;
    if (selectedStatus !== 'Pending') {
      url += `&status=${selectedStatus}`;
    } else {
      url += `&status=Pending`;
    }
    
    const res = await api.get(url, { withCredentials: true });
    console.log("API Response:", res.data); 
    setDeliveries(res.data);
  } catch (err) {
    console.error('Error fetching deliveries:', err);
  }
};

  useEffect(() => {
    fetchDeliveries();
  }, [selectedStatus, user._id]);

  const filteredDeliveries = deliveries.filter(delivery => {
    const searchLower = searchTerm.toLowerCase();
    return (
      delivery.pickupAddress.toLowerCase().includes(searchLower) ||
      delivery.dropoffAddress.toLowerCase().includes(searchLower) ||
      delivery.packageNote?.toLowerCase().includes(searchLower) ||
      delivery._id.toLowerCase().includes(searchLower) ||
      (delivery.acceptedBy?.name && delivery.acceptedBy.name.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Your Delivery Requests</h2>

      <input
        type="text"
        placeholder="Search deliveries by address, name, or ID..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredDeliveries.length === 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <p>No {selectedStatus.toLowerCase()} delivery requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDeliveries.map(delivery => (
            <div key={delivery._id} className="bg-white shadow p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Delivery Details</h3>
                  <p><strong>Pickup:</strong> {delivery.pickupAddress}</p>
                  <p><strong>Dropoff:</strong> {delivery.dropoffAddress}</p>
                  <p><strong>Note:</strong> {delivery.packageNote || 'None'}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${
                    delivery.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    delivery.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                    delivery.status === 'In-Transit' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>{delivery.status}</span></p>
                  <p><strong>Created:</strong> {new Date(delivery.createdAt).toLocaleString()}</p>
                </div>
                
                {(selectedStatus !== 'Pending' && delivery.acceptedBy) && (
                  <div>
                    <h3 className="font-bold text-lg mb-2">Driver Details</h3>
                    <p><strong>Name:</strong> {delivery.acceptedBy.name}</p>
                    <p><strong>Email:</strong> {delivery.acceptedBy.email}</p>
                    <p><strong>Accepted At:</strong> {delivery.acceptedAt ? new Date(delivery.acceptedAt).toLocaleString() : 'N/A'}</p>
                    {delivery.completedAt && (
                      <p><strong>Completed At:</strong> {new Date(delivery.completedAt).toLocaleString()}</p>
                    )}
                  </div>
                )}
              </div>
              
              {delivery.itemImage && (
                <div className="mt-4">
                  <p className="font-bold mb-2">Item Image:</p>
                  <img
                    src={`http://localhost:5000/uploads/deliveries/${delivery.itemImage}`}
                    alt="Item for delivery"
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