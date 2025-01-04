import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterCategory } from '../features/billsSlice';

function CategoryFilter() {
  const dispatch = useDispatch();
  const filterCategory = useSelector(state => state.bills.filterCategory);
  const bills = useSelector(state => state.bills.bills);

  const categories = ['all', ...new Set(bills.map(bill => bill.category.toLowerCase()))];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
      <select
        value={filterCategory}
        onChange={(e) => dispatch(setFilterCategory(e.target.value))}
        className="border rounded px-3 py-2"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;

