import { useState } from "react";
import { createDelivery } from "../api/deliveries";

export default function CreateDelivery({ onCreated }) {
  const [form, setForm] = useState({
    pickupAddress: "",
    dropoffAddress: "",
    packageNote: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await createDelivery(form);
      setMsg("Delivery created successfully!");
      setForm({ pickupAddress: "", dropoffAddress: "", packageNote: "" });
      onCreated && onCreated();
    } catch (err) {
      setMsg("Error creating delivery.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-md p-6">
      <h2 className="text-lg font-bold mb-4 text-center">Create Delivery Request</h2>
      <input
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        name="pickupAddress"
        placeholder="Pickup Address"
        value={form.pickupAddress}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        name="dropoffAddress"
        placeholder="Dropoff Address"
        value={form.dropoffAddress}
        onChange={handleChange}
        required
      />
      <input
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        name="packageNote"
        placeholder="Package Note"
        value={form.packageNote}
        onChange={handleChange}
        required
      />
      <button
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded shadow hover:from-green-600 hover:to-green-800 transition font-semibold"
        type="submit"
      >
        Create
      </button>
      {msg && <div className="mt-2 text-center text-sm text-green-700">{msg}</div>}
    </form>
  );
}
