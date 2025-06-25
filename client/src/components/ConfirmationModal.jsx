const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
