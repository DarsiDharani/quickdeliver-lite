import React, { useState } from 'react';
import api from '../api/api';

const CreateDelivery = ({ onClose }) => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    packageNote: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

const handleSubmit = async e => {
  e.preventDefault();
  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => data.append(key, value));
  if (file) data.append('itemImage', file);

  try {
    await api.post('/deliveries', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });
    alert('Delivery created successfully');
    if (typeof onClose === 'function') {
      onClose(); 
    }
  } catch (err) {
    console.error(err);
    alert('Failed to create delivery');
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="pickupAddress"
        value={formData.pickupAddress}
        onChange={handleChange}
        placeholder="Pickup Address"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="dropoffAddress"
        value={formData.dropoffAddress}
        onChange={handleChange}
        placeholder="Dropoff Address"
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="packageNote"
        value={formData.packageNote}
        onChange={handleChange}
        placeholder="Any special notes for delivery"
        required
        className="w-full p-2 border rounded"
      />
      <div>
        <label className="block mb-1">Upload Item Photo (optional):</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Submit Delivery Request
      </button>
    </form>
  );
};

export default CreateDelivery;
