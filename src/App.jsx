import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import BillList from './components/BillList';
import BillForm from './components/BillForm';
import CategoryFilter from './components/CategoryFilter';
import Chart from './components/Chart';
import BudgetOptimizer from './components/BudgetOptimizer';
import 'tailwindcss/tailwind.css';
import './index.css';
//import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Car Wash Bill Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <BillForm />
            <CategoryFilter />
            <BillList />
          </div>
          <div>
            <Chart />
            <BudgetOptimizer />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;

