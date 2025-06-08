import axios from "axios";
const API_BASE = "http://localhost:5000/api/deliveries";

export async function createDelivery(formData) {
  const res = await axios.post(API_BASE, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return res.data;
}

export async function getPendingDeliveries() {
  const res = await axios.get(API_BASE, {
    withCredentials: true
    // No need for params, backend filters by status
  });
  return res.data;
}

export async function claimDelivery(deliveryId) {
  const res = await axios.post(
    `${API_BASE}/${deliveryId}/claim`,
    {},
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  return res.data;
}
