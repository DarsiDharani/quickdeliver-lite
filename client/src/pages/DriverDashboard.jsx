import { useEffect, useState } from "react";
import api from "../api/api";
import DeliveryCard from "../components/DeliveryCard";
import toast from "react-hot-toast";

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
      const endpoint = status === 'Pending' ? '/deliveries/pending' : `/deliveries/status/${status}`;
      const res = await api.get(endpoint);
      if (res.data.success) {
        setDeliveries(prev => ({ ...prev, [status]: res.data.deliveries }));
      } else {
        throw new Error(res.data.error || 'Failed to fetch deliveries');
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to load ${status} deliveries`);
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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative"
      style={{
        background: "linear-gradient(to right top, #eef2f3, #8ec5fc)",
      }}
    >
      <div className="relative z-10 w-full max-w-screen-xl px-4 py-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4 tracking-tight">
          Driver Dashboard
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Search deliveries by address, customer, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
        />

        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {STATUSES.map(status => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeTab === status
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'Pending' ? 'Pending Requests' : status}
            </button>
          ))}
          <button
            onClick={() => {
              refreshDeliveries();
              toast.success("Deliveries refreshed");
            }}
            className="ml-4 px-4 py-2 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading deliveries...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeliveries.length > 0 ? (
              filteredDeliveries.map(delivery => (
                <DeliveryCard
                  key={delivery._id}
                  delivery={delivery}
                  showAcceptButton={activeTab === 'Pending'}
                  showStatusActions={['Accepted', 'In-Transit'].includes(activeTab)}
                  onStatusChange={refreshDeliveries}
                  onAcceptSuccess={refreshDeliveries}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                No {activeTab.toLowerCase()} deliveries found.
              </div>
            )}
          </div>
        )}
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
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DriverDashboard;
