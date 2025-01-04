import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBillAsync } from '../features/billsSlice';

function BillEditForm({ bill, onClose }) {
  const dispatch = useDispatch();
  const [editedBill, setEditedBill] = useState(bill);

  const handleChange = (e) => {
    setEditedBill({ ...editedBill, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBillAsync(editedBill));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Bill</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedBill.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-1">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={editedBill.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={editedBill.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={editedBill.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillEditForm;

