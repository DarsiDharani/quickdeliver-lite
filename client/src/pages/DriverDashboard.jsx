import { useEffect, useState } from "react";
import api from "../api/api";
import DeliveryCard from "../components/DeliveryCard";

const STATUSES = ['Pending', 'Accepted', 'In-Transit', 'Completed'];

const DriverDashboard = ({ user }) => {
  const [deliveries, setDeliveries] = useState({});
  const [activeTab, setActiveTab] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeliveries = async (status) => {
    try {
      setLoading(true);
      setError(null);
      
      const endpoint = status === 'Pending' 
        ? '/deliveries/pending' 
        : `/deliveries/status/${status}`;
      
      const res = await api.get(endpoint);
      
      if (res.data.success) {
        setDeliveries(prev => ({ 
          ...prev, 
          [status]: res.data.deliveries 
        }));
      } else {
        throw new Error(res.data.error || 'Failed to fetch deliveries');
      }
    } catch (err) {
      console.error(`Error loading ${status} deliveries:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'driver') {
      STATUSES.forEach(fetchDeliveries);
    }
  }, [user]);

  const filteredDeliveries = deliveries[activeTab]?.filter(d =>
    d.createdBy?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.pickupAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.dropoffAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d._id?.includes(searchTerm)
  ) || [];

  const refreshDeliveries = () => {
    STATUSES.forEach(fetchDeliveries);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Driver Dashboard</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Search deliveries by address, customer, or ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      <div className="flex justify-center gap-4 mb-6">
        {STATUSES.map(status => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'Pending' ? 'Pending Requests' : status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p>Loading deliveries...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map(delivery => (
              <DeliveryCard
                key={delivery._id}
                delivery={delivery}
                showAcceptButton={activeTab === 'Pending'}
                showStatusActions={['Accepted', 'In-Transit'].includes(activeTab)}
                onStatusChange={refreshDeliveries}
                onAcceptSuccess={() => fetchDeliveries('Pending')}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                No {activeTab.toLowerCase()} deliveries found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;