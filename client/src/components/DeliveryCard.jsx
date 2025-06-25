import { useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { FaUser, FaMapMarkerAlt, FaClipboard, FaEnvelope, FaTruck, FaCheckCircle } from "react-icons/fa";
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
  onStatusChange,
  onAcceptSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusUpdate = async (newStatus, confirmed = false) => {
    try {
      setLoading(true);
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
        toast.success(`Marked as ${newStatus}`);
        onStatusChange();
      } else {
        throw new Error(res.data.message || 'Status update failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
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
        toast.success("Delivery accepted");
        onAcceptSuccess();
      } else {
        throw new Error(res.data.message || 'Accept failed');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl border p-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">Delivery #{delivery._id.slice(-6)}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeStyles[delivery.status]}`}>
          {delivery.status}
        </span>
      </div>

      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaUser className="text-gray-500" /> Customer
        </h4>
        <p className="ml-5 text-sm">{delivery.createdBy?.name}</p>
        <p className="ml-5 text-sm flex items-center gap-1">
          <FaEnvelope className="text-gray-500" /> {delivery.createdBy?.email}
        </p>
      </div>

      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" /> Locations
        </h4>
        <div className="ml-5 text-sm space-y-1">
          <p><strong>From:</strong> {delivery.pickupAddress}</p>
          <p><strong>To:</strong> {delivery.dropoffAddress}</p>
        </div>
      </div>

      {delivery.packageNote && (
        <p className="text-sm flex items-start gap-2 mt-2 ml-5">
          <FaClipboard className="text-gray-500 mt-0.5" />
          <span><strong>Note:</strong> {delivery.packageNote}</span>
        </p>
      )}

      <div className="mt-4 space-y-2">
        {showAcceptButton && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Accepting..." : "Accept Delivery"}
          </button>
        )}

        {showStatusActions && delivery.status === "Accepted" && (
          <button
            onClick={() => handleStatusUpdate("In-Transit")}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition"
          >
            <FaTruck className="inline mr-2" /> Mark as In-Transit
          </button>
        )}

        {showStatusActions && delivery.status === "In-Transit" && (
          <button
            onClick={() => handleStatusUpdate("Completed")}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            <FaCheckCircle className="inline mr-2" /> Mark as Completed
          </button>
        )}
      </div>

      {showConfirmation && (
        <ConfirmationModal
          title="Confirm Pickup"
          message="Are you sure you've collected the package?"
          onConfirm={() => handleStatusUpdate(pendingStatus, true)}
          onCancel={() => {
            setPendingStatus(null);
            setShowConfirmation(false);
          }}
        />
      )}
    </div>
  );
};

export default DeliveryCard;
