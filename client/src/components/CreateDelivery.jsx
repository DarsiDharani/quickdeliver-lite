import React, { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";

const CreateDelivery = ({ onClose }) => {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropoffAddress: "",
    packageNote: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    if (file) data.append("itemImage", file);

    try {
      await api.post("/deliveries", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create delivery");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        name="pickupAddress"
        value={formData.pickupAddress}
        onChange={handleChange}
        placeholder="Pickup Address"
        required
        className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />
      <input
        name="dropoffAddress"
        value={formData.dropoffAddress}
        onChange={handleChange}
        placeholder="Dropoff Address"
        required
        className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />
      <textarea
        name="packageNote"
        value={formData.packageNote}
        onChange={handleChange}
        placeholder="Any special notes for delivery"
        required
        className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Item Photo (optional)
        </label>
        <input type="file" onChange={handleFileChange} />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="mt-2 w-24 h-24 object-cover rounded border"
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
      >
        Submit Delivery Request
      </button>
    </form>
  );
};

export default CreateDelivery;
