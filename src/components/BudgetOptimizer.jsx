import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function BudgetOptimizer() {
  const bills = useSelector(state => state.bills.bills);
  const monthlyBudget = useSelector(state => state.bills.monthlyBudget);
  const [optimizedBills, setOptimizedBills] = useState([]);
  const [totalSelected, setTotalSelected] = useState(0);

  useEffect(() => {
    const sortedBills = [...bills].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    let totalAmount = 0;
    const selected = [];

    for (const bill of sortedBills) {
      if (totalAmount + parseFloat(bill.amount) <= monthlyBudget) {
        totalAmount += parseFloat(bill.amount);
        selected.push(bill.id);
      } 
    }

    setOptimizedBills(selected);
    setTotalSelected(totalAmount);
  }, [bills, monthlyBudget]);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Budget Optimizer</h2>
      <p className="mb-2">Monthly Budget: ${monthlyBudget.toFixed(2)}</p>
      <p className="mb-4">Total Selected: ${totalSelected.toFixed(2)} ({((totalSelected / monthlyBudget) * 100).toFixed(2)}% of budget)</p>
      <p className="mb-2 font-semibold">Optimized Bills to Pay:</p>
      <ul className="space-y-2">
        {bills.map(bill => (
          <li
            key={bill.id}
            className={`p-3 rounded flex justify-between items-center ${
              optimizedBills.includes(bill.id) ? 'bg-green-100 border border-green-300' : 'bg-gray-100'
            }`}
          >
            <span>{bill.description}</span>
            <span className="font-semibold">${parseFloat(bill.amount).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetOptimizer;

