import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBills, removeBillAsync } from '../features/billsSlice';
import BillEditForm from './BillEditForm';

function BillList() {
  const dispatch = useDispatch();
  const bills = useSelector(state => state.bills.bills);
  const filterCategory = useSelector(state => state.bills.filterCategory);
  const status = useSelector(state => state.bills.status);
  const error = useSelector(state => state.bills.error);
  const [editingBill, setEditingBill] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBills());
    }
  }, [status, dispatch]);

  const filteredBills = filterCategory === 'all'
    ? bills
    : bills.filter(bill => bill.category.toLowerCase() === filterCategory.toLowerCase());

  const totalAmount = filteredBills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  if (status === 'loading') {
    return <div>Loading bills...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Bill List</h2>
      <p className="mb-4">Total Monthly Billed Amount: ${totalAmount.toFixed(2)}</p>
      <ul className="space-y-4">
        {filteredBills.map(bill => (
          <li key={bill.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold">{bill.description}</h3>
            <p>Category: {bill.category}</p>
            <p>Amount: ${bill.amount}</p>
            <p>Date: {bill.date}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setEditingBill(bill)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(removeBillAsync(bill.id))}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingBill && (
        <BillEditForm
          bill={editingBill}
          onClose={() => setEditingBill(null)}
        />
      )}
    </div>
  );
}

export default BillList;

