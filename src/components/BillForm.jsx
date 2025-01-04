import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBillAsync } from '../features/billsSlice';

function BillForm() {
  const dispatch = useDispatch();
  const [bill, setBill] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
  });

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBillAsync(bill));
    setBill({ description: '', category: '', amount: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Bill</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="description"
          value={bill.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="category"
          value={bill.category}
          onChange={handleChange}
          placeholder="Category"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="number"
          name="amount"
          value={bill.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="date"
          value={bill.date}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Bill
      </button>
    </form>
  );
}

export default BillForm;

