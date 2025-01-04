import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  bills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: "430",
      date: "01-02-2025"
    },
    {
      id: 2,
      description: "Car wash",
      category: "utility",
      amount: "500",
      date: "01-06-2025"
    },
    {
      id: 3,
      description: "Amazon",
      category: "shopping",
      amount: "2030",
      date: "01-07-2025"
    },
    {
      id: 4,
      description: "House rent",
      category: "Food & Dining",
      amount: "35900",
      date: "01-03-2025"
    },
    {
      id: 5,
      description: "Tuition",
      category: "education",
      amount: "2200",
      date: "01-12-2025"
    },
    {
      id: 6,
      description: "Laundry",
      category: "Personal Care",
      amount: "320",
      date: "01-14-2025"
    },
    {
      id: 7,
      description: "Vacation",
      category: "Travel",
      amount: "3430",
      date: "01-18-2025"
    }
  ],
  filterCategory: 'all',
  monthlyBudget: 50000,
  status: 'idle',
  error: null,
};

// Simulated API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBills = createAsyncThunk('bills/fetchBills', async () => {
  await delay(1000); // Simulate API delay
  return initialState.bills;
});

export const addBillAsync = createAsyncThunk('bills/addBillAsync', async (bill) => {
  await delay(500); // Simulate API delay
  return { ...bill, id: Date.now() };
});

export const editBillAsync = createAsyncThunk('bills/editBillAsync', async (bill) => {
  await delay(500); // Simulate API delay
  return bill;
});

export const removeBillAsync = createAsyncThunk('bills/removeBillAsync', async (id) => {
  await delay(500); // Simulate API delay
  return id;
});

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBillAsync.fulfilled, (state, action) => {
        state.bills.push(action.payload);
      })
      .addCase(editBillAsync.fulfilled, (state, action) => {
        const index = state.bills.findIndex(bill => bill.id === action.payload.id);
        if (index !== -1) {
          state.bills[index] = action.payload;
        }
      })
      .addCase(removeBillAsync.fulfilled, (state, action) => {
        state.bills = state.bills.filter(bill => bill.id !== action.payload);
      });
  },
});

export const { setFilterCategory, setMonthlyBudget } = billsSlice.actions;

export default billsSlice.reducer;

