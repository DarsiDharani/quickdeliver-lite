import { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaClipboard, FaTruck, FaCheckCircle } from "react-icons/fa";
import api from "../api/api";
import ConfirmationModal from './ConfirmationModal'; 

const statusBadgeStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-blue-100 text-blue-800",
  "In-Transit": "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
};

const DeliveryCard = ({
  delivery,
  showAcceptButton,
  showStatusActions,
  onAcceptSuccess,
  onStatusChange
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusUpdate = async (newStatus, confirmed = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // For In-Transit status, check confirmation
      if (newStatus === "In-Transit" && !confirmed) {
        setPendingStatus(newStatus);
        setShowConfirmation(true);
        setLoading(false);
        return;
      }

      const res = await api.patch(
        `/deliveries/${delivery._id}/status`,
        { newStatus, confirmation: confirmed },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data.success) {
        onStatusChange();
      } else {
        throw new Error(res.data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    handleStatusUpdate(pendingStatus, true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPendingStatus(null);
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.patch(
        `/deliveries/${delivery._id}/accept`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (res.data.success) {
        onAcceptSuccess();
      } else {
        throw new Error(res.data.message || 'Failed to accept delivery');
      }
    } catch (err) {
      console.error("Error accepting delivery:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl border p-5 w-full max-w-md mx-auto">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-3 rounded text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold text-gray-800">
          Delivery #{delivery._id.toString().slice(-6).toUpperCase()}
        </h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeStyles[delivery.status]}`}>
          {delivery.status}
        </span>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaUser className="text-gray-500" /> Customer
        </h4>
        <p className="ml-5 text-sm text-gray-800">{delivery.createdBy?.name}</p>
        <p className="ml-5 text-sm text-gray-800 flex items-center gap-1">
          <FaEnvelope /> {delivery.createdBy?.email}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" /> Delivery Details
        </h4>
        <div className="ml-5 space-y-1">
          <p className="text-sm">
            <span className="font-medium">From:</span> {delivery.pickupAddress}
          </p>
          <p className="text-sm">
            <span className="font-medium">To:</span> {delivery.dropoffAddress}
          </p>
          {delivery.packageNote && (
            <p className="text-sm flex items-start gap-1">
              <FaClipboard className="text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="font-medium">Note:</span> {delivery.packageNote}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {showAcceptButton && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin">↻</span> Processing...
              </>
            ) : (
              'Accept Delivery'
            )}
          </button>
        )}

        {showStatusActions && (
          <>
            {delivery.status === "Accepted" && (
              <button
                onClick={() => handleStatusUpdate("In-Transit")}
                disabled={loading}
                className={`w-full bg-purple-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
              >
                <FaTruck /> Mark as In-Transit
              </button>
            )}

            {delivery.status === "In-Transit" && (
              <button
                onClick={() => handleStatusUpdate("Completed")}
                disabled={loading}
                className={`w-full bg-green-600 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                <FaCheckCircle /> Mark as Completed
              </button>
            )}
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          title="Confirm Package Pickup"
          message="Have you physically taken the parcel?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default DeliveryCard;